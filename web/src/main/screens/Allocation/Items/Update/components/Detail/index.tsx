import { Grid } from '@mui/material';
import { FormikProps } from 'formik';
import { KeyboardEvent, forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '~/base/components/Icon/FontAwesome';
import IconButton from '~/base/components/Material/Button/Icon';
import DataGrid from '~/base/components/Material/DataGrid';
import TextField from '~/base/components/Material/Form/TextField';
import Tooltip from '~/base/components/Material/Tooltip';
import Typography from '~/base/components/Material/Typography';
import View from '~/base/components/Material/View';
import { GroupAccountResponse } from '~/main/features/account-settings/group-accounts/types';
import { AllocationItemsDetailChanged, AllocationItemsDetailResponse } from '~/main/features/allocation/items/types';
import { getItemsHistory } from '~/main/features/items/action';
import { useDispatchApp, useSelectorApp } from '~/redux/store';
import { useColumns, useColumnsOtherGroups } from '../../common/columns';
import { FormValues } from '../../common/form';
import { ItemValue, Label } from '../Typography';
import AccountGroupOptions from './AccountGroupOptions';
import RowDetail from './RowDetail';

type Props = {
  formik: FormikProps<FormValues>;
  detail: AllocationItemsDetailResponse;
  imagesUrl: string[];
  onEdited?: () => void;
  onChange?: (item: AllocationItemsDetailChanged) => void;
  onReloadImages: () => void;
  onLayoutRender?: () => void;
  openSplitPane: boolean;
  onCloseSplitPane?: () => void;
};

const Detail = forwardRef((props: Props, ref) => {
  const {
    formik,
    detail,
    imagesUrl,
    onEdited,
    onChange,
    onReloadImages,
    onLayoutRender,
    openSplitPane,
    onCloseSplitPane
  } = props;
  const { values } = formik;
  const { groupAccount = null } = values;

  const { t } = useTranslation();

  const containerRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatchApp();
  const common = useSelectorApp((state) => state.common);
  const defaultItemsHistory = useSelectorApp((state) => state.items.history);

  const { language } = common;
  const { data: itemsHistory = [], status } = defaultItemsHistory['0'] || {};

  const [visibleFilePdf, setVisibleFilePdf] = useState(false);

  const [groupAccountOpen, setGroupAccountOpen] = useState(false);
  const groupAccountInputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    dispatch(
      getItemsHistory({
        group_nr: 0,
        items: [{ item_name: detail.itemName, item_vat: 0 }]
      })
    );
  }, [detail.itemName, dispatch]);

  useEffect(() => {
    if (onLayoutRender) {
      onLayoutRender();
    }
  }, [onLayoutRender]);

  const onChangeVisibleFilePdf = useCallback(() => {
    if (openSplitPane) {
      onCloseSplitPane?.();
      setVisibleFilePdf(true);
      return;
    }

    setVisibleFilePdf((prev) => !prev);
  }, [onCloseSplitPane, openSplitPane]);

  const onChangeGroupAccount = useCallback(
    async (groupAccount: GroupAccountResponse) => {
      formik.setFieldValue('groupAccount', groupAccount);

      if (onEdited) {
        onEdited();
      }

      if (onChange) {
        onChange({
          id: detail.id,
          accountId: groupAccount?.id,
          accountNo: groupAccount?.accountNo
        });
      }

      formik.submitForm();

      setGroupAccountOpen(false);
    },
    [detail.id, formik, onChange, onEdited]
  );

  const onKeyDownGroupAccount = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter') {
        if (onEdited) {
          onEdited();
        }

        if (groupAccount) {
          if (onChange) {
            onChange({
              id: detail.id,
              accountId: groupAccount.id,
              accountNo: groupAccount.accountNo
            });
          }
        }

        return;
      }

      setGroupAccountOpen(true);
    },
    [detail.id, groupAccount, onChange, onEdited]
  );

  const columns = useColumns(t);
  const columnsOtherGroups = useColumnsOtherGroups(t);

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
                  {detail.supplierNo ? `(${detail.supplierNo}) ` : ''}
                  {detail.supplierName}
                </ItemValue>
              </View>
              <View flexDirection='row' gap={3}>
                <Label width='70px'>{t('app.allocation.items.info.customer')}:</Label>
                <ItemValue minHeight={38}>
                  {detail.customerNo ? `(${detail.customerNo}) ` : ''}
                  {detail.customerName}
                </ItemValue>
              </View>
              <View flexDirection='row' gap={3}>
                <Label width='70px'>{t('app.allocation.items.info.invoice-number')}:</Label>
                <ItemValue>{detail.invoiceNumber}</ItemValue>
              </View>
              <View flexDirection='row' alignItems='center' gap={3}>
                <Label width='70px'>{t('app.allocation.items.info.filename')}:</Label>
                <ItemValue display='flex' flexDirection='row' alignItems='center' gap={2}>
                  {detail.externalFilename}
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
                      to={`https://translate.google.com/?sl=auto&tl=${language}&text=${encodeURI(detail.itemName)}&op=translate`}
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
                  <TextField multiline maxRows={4} value={detail.itemNameVI} />
                </View>
              </View>
              <View flexDirection='row' alignItems='center' gap={1}>
                <Label sx={{ width: { xs: '30%', md: '10%' } }}>{t('app.allocation.items.info.group-account')}:</Label>
                <View width='90%'>
                  <AccountGroupOptions
                    formik={formik}
                    open={groupAccountOpen}
                    inputRef={groupAccountInputRef}
                    onKeyDown={onKeyDownGroupAccount}
                    onChangeOpen={setGroupAccountOpen}
                    onChangeValue={onChangeGroupAccount}
                  />
                </View>
              </View>
            </View>
          </Grid>
        </Grid>
        <RowDetail formik={formik} detail={detail} columns={columns} onChange={onChange} />
      </View>
      {!openSplitPane && (
        <View flexGrow={1}>
          {visibleFilePdf && (
            <View flexGrow={1}>
              <iframe src={detail.pdfUrl} style={{ flexGrow: 1, border: 0 }} />
            </View>
          )}
          {!visibleFilePdf && (
            <DataGrid
              rows={itemsHistory}
              columns={columnsOtherGroups}
              getRowId={(row) => row.id}
              loading={status === 'loading'}
            />
          )}
        </View>
      )}
    </View>
  );
});

Detail.displayName = 'Detail';

export default Detail;
