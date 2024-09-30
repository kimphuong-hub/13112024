import { Grid } from '@mui/material';
import { AxiosResponse } from 'axios';
import { forwardRef, useCallback, useContext, useEffect, useImperativeHandle, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { Link, useSearchParams } from 'react-router-dom';
import FontAwesomeIcon from '~/base/components/Icon/FontAwesome';
import IconButton from '~/base/components/Material/Button/Icon';
import TextField from '~/base/components/Material/Form/TextField';
import Tooltip from '~/base/components/Material/Tooltip';
import Typography from '~/base/components/Material/Typography';
import View from '~/base/components/Material/View';
import ItemsHistory from '~/main/components/Items/History';
import { getAllocationInvoiceImages } from '~/main/features/allocation/items/action';
import { getItemsHistory } from '~/main/features/items/action';
import { useDispatchApp, useSelectorApp } from '~/redux/store';
import { useColumns } from '../../common/columns';
import { allowedStatusReplyClarification } from '../../common/config';
import { SelectedContext } from '../../contexts/selected';
import { ItemValue, Label } from '../Typography';
import AccountGroupOptions from './Options/AccountGroupOptions';
import ReplyClarification from './ReplyClarification';
import RowDetail from './RowDetail';
import { useFormikContext } from 'formik';
import { FormValues } from '../../common/form';

type Props = {
  loading: boolean;
  onLoading: (status: boolean) => void;
  onNextItem: () => void;
  onLayoutRender?: () => void;
  openSplitPane: boolean;
  onCloseSplitPane?: () => void;
};

const Detail = forwardRef((props: Props, ref) => {
  const { loading, onLoading, onNextItem, onLayoutRender, openSplitPane, onCloseSplitPane } = props;

  const { t } = useTranslation();

  const [searchParams] = useSearchParams();
  const status = searchParams.get('status') || '';

  const containerRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatchApp();
  const common = useSelectorApp((state) => state.common);
  const { language } = common;

  const { setFieldValue } = useFormikContext<FormValues>();
  const { allocationItem } = useContext(SelectedContext);

  const [imagesUrl, setImagesUrl] = useState<string[]>([]);
  const [visibleFilePdf, setVisibleFilePdf] = useState(false);

  useEffect(() => {
    dispatch(
      getItemsHistory({
        group_nr: 0,
        items: [{ item_name: allocationItem?.itemName || '', item_vat: 0 }]
      })
    );
  }, [allocationItem?.itemName, dispatch]);

  useEffect(() => {
    onLayoutRender?.();
  }, [onLayoutRender]);

  useEffect(() => {
    if (allocationItem?.imagesUrl) {
      setImagesUrl(allocationItem?.imagesUrl);
    }
  }, [allocationItem?.imagesUrl, onLayoutRender]);

  useEffect(() => {
    if (allocationItem?.accountId) {
      setFieldValue('groupAccount', {
        id: allocationItem.accountId,
        accountNo: allocationItem.accountNo,
        accountName: allocationItem.accountName
      });
    } else {
      setFieldValue('groupAccount', null);
    }

    if (allocationItem?.systemAccountId) {
      setFieldValue('systemAccount', {
        id: allocationItem.systemAccountId,
        accountNo: allocationItem.systemAccountNo,
        accountName: allocationItem.systemAccountName
      });
    } else {
      setFieldValue('systemAccount', null);
    }
  }, [allocationItem, setFieldValue]);

  const onReloadImages = useCallback(() => {
    if (loading) {
      return;
    }

    onLoading(true);

    toast.promise(
      dispatch(getAllocationInvoiceImages(allocationItem?.itemName || ''))
        .then((response) => {
          const payload = response.payload as AxiosResponse;
          if (payload && payload.data && payload.data.data) {
            setImagesUrl(payload.data.data);
          }
        })
        .finally(() => {
          onLoading(false);
        }),
      {
        loading: t('app.system.loading.processing'),
        success: t('app.system.loading.success'),
        error: (error) => `${error.message || error || t('app.system.error.message')}`
      }
    );
  }, [allocationItem, dispatch, loading, onLoading, t]);

  const onChangeVisibleFilePdf = useCallback(() => {
    if (openSplitPane) {
      onCloseSplitPane?.();
      setVisibleFilePdf(true);
      return;
    }

    setVisibleFilePdf((prev) => !prev);
  }, [onCloseSplitPane, openSplitPane]);

  const columns = useColumns(t);

  useImperativeHandle(ref, () => {
    return {
      containerHeight: containerRef?.current?.clientHeight,
      toggleVisibleFilePdf: onChangeVisibleFilePdf
    };
  }, [onChangeVisibleFilePdf]);

  return (
    <View padding='10px' flexGrow={1} gap={2}>
      <View ref={containerRef} overflow='auto' gap={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6} xl={3}>
            <View gap={0.5}>
              <View flexDirection='row' gap={3}>
                <Label width='70px'>{t('app.allocation.items.info.supplier')}:</Label>
                <ItemValue minHeight={38}>
                  {allocationItem?.supplierNo ? `(${allocationItem?.supplierNo}) ` : ''}
                  {allocationItem?.supplierName}
                </ItemValue>
              </View>
              <View flexDirection='row' gap={3}>
                <Label width='70px'>{t('app.allocation.items.info.customer')}:</Label>
                <ItemValue minHeight={38}>
                  {allocationItem?.customerNo ? `(${allocationItem?.customerNo}) ` : ''}
                  {allocationItem?.customerName}
                </ItemValue>
              </View>
              <View flexDirection='row' gap={3}>
                <Label width='70px'>{t('app.allocation.items.info.invoice-number')}:</Label>
                <ItemValue>{allocationItem?.invoiceNumber}</ItemValue>
              </View>
              <View flexDirection='row' alignItems='center' gap={3}>
                <Label width='70px'>{t('app.allocation.items.info.filename')}:</Label>
                <ItemValue display='flex' flexDirection='row' alignItems='center' gap={2}>
                  {allocationItem?.externalFilename}
                  <Tooltip title={t('app.allocation.items.info.button.file-pdf.tooltip')}>
                    <IconButton onClick={onChangeVisibleFilePdf}>
                      <FontAwesomeIcon icon='fa-solid fa-file-pdf' size={15} />
                    </IconButton>
                  </Tooltip>
                </ItemValue>
              </View>
            </View>
          </Grid>
          <Grid item xs={12} sm={6} md={6} xl={4}>
            <View gap={2}>
              <Label width='70px'>{t('app.allocation.items.info.images')}:</Label>
              <View gap={2} height='120px' overflow='auto'>
                {imagesUrl.length > 0 && (
                  <View flexGrow={1} flexWrap='wrap' flexDirection='row' gap={1}>
                    {imagesUrl.slice(0, 2).map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        style={{ maxWidth: '48%', height: '110px', objectFit: 'cover', borderRadius: '5px' }}
                      />
                    ))}
                  </View>
                )}
                {imagesUrl.length === 0 && (
                  <View flexDirection='row' alignItems='center' ml='10px' gap={2}>
                    <Tooltip title={t('app.allocation.items.info.button.reload-images.tooltip')}>
                      <IconButton onClick={onReloadImages}>
                        <FontAwesomeIcon icon='fa-solid fa-arrows-rotate' size={15} />
                      </IconButton>
                    </Tooltip>
                    <Typography fontSize={13}>{t('app.allocation.items.info.no-images')}</Typography>
                  </View>
                )}
              </View>
            </View>
          </Grid>
          <Grid item xs={12} sm={12} md={12} xl={5}>
            <View gap={1}>
              <View gap={1}>
                <View flexDirection='row' alignItems='center'>
                  <Tooltip
                    title={`${t('app.allocation.items.info.button.translate.tooltip')} (${language?.toUpperCase()})`}
                  >
                    <Link
                      to={`https://translate.google.com/?sl=auto&tl=${language}&text=${encodeURI(allocationItem?.itemName || '')}&op=translate`}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <IconButton>
                        <FontAwesomeIcon icon='fa-solid fa-globe' size={15} />
                      </IconButton>
                    </Link>
                  </Tooltip>
                  <Label sx={{ width: { xs: '30%', md: '15%' } }}>
                    {t('app.allocation.items.info.translate')} ({language?.toUpperCase()}):
                  </Label>
                </View>
                <View gap={3}>
                  <TextField maxRows={4} multiline value={allocationItem?.itemNameVI} />
                </View>
              </View>
              <View flexDirection='row' alignItems='center' gap={1}>
                <Label sx={{ width: { xs: '30%', md: '10%' } }}>{t('app.allocation.items.info.group-account')}:</Label>
                <View width='90%'>
                  <AccountGroupOptions />
                </View>
              </View>
            </View>
          </Grid>
        </Grid>
        <RowDetail columns={columns} onNextItem={onNextItem} />
      </View>
      {!openSplitPane && (
        <View flexGrow={1}>
          {visibleFilePdf && (
            <View flexGrow={1}>
              <iframe src={allocationItem?.pdfUrl} style={{ flexGrow: 1, border: 0 }} />
            </View>
          )}
          {!visibleFilePdf && (
            <View flexGrow={1} gap={2}>
              <ItemsHistory searchValue={allocationItem?.itemName} hideTopBar />
              {allowedStatusReplyClarification.includes(status) && <ReplyClarification />}
            </View>
          )}
        </View>
      )}
    </View>
  );
});

Detail.displayName = 'Detail';

export default Detail;
