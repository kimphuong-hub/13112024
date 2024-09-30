import { LinearProgress } from '@mui/material';
import { GridRowSelectionModel } from '@mui/x-data-grid';
import { AxiosResponse, HttpStatusCode } from 'axios';
import { Formik, FormikProps } from 'formik';
import {
  RefObject,
  Suspense,
  forwardRef,
  lazy,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState
} from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useParams, useSearchParams } from 'react-router-dom';
import { Pane } from 'split-pane-react';
import DataGrid from '~/base/components/Material/DataGrid';
import View from '~/base/components/Material/View';
import Section from '~/base/components/Material/View/Section';
import SplitPane from '~/base/components/SplitPane';
import { replyClarification, saveAllocationItemsDetail } from '~/main/features/allocation/items/action';
import { allocationItemsAction } from '~/main/features/allocation/items/slice';
import {
  AllocationItemsDetailChanged,
  AllocationItemsDetailResponse,
  ReplyClarificationPayload
} from '~/main/features/allocation/items/types';
import usePromptNotSaved from '~/main/hooks/usePromptChanged';
import { useDispatchApp } from '~/redux/store';
import TopBar from './TopBar';
import { useColumns } from './common/columns';
import { allowedStatusReplyClarification } from './common/config';
import { FormValues, getFormKeyNames, initialValues, validationSchema } from './common/form';
import { SelectedContext } from './contexts/selected';

type Props = {
  type: 'items' | 'archives';
  getData: (callback?: () => void) => void;
  details: AllocationItemsDetailResponse[];
  detailsStatus: string;
  itemsChanged: { [itemId: string]: AllocationItemsDetailChanged };
  onItemsChanged: (itemsChanged: { [itemId: string]: AllocationItemsDetailChanged }) => void;
  splitPaneRef: RefObject<{ sizesPane: number[]; switchPane: (status?: 'open' | 'close') => void }>;
};

const Detail = lazy(() => import('./components/Detail'));

const Main = forwardRef((props: Props, ref) => {
  const { type, getData, details, detailsStatus, itemsChanged, onItemsChanged, splitPaneRef } = props;

  const { companyNo = '' } = useParams();

  const { t } = useTranslation();

  const [searchParams] = useSearchParams();
  const status = searchParams.get('status') || '';
  const sizePane = searchParams.get('size-pane') || '';

  const viewRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<{ containerHeight: number; toggleVisibleFilePdf: () => void }>(null);
  const formikRef = useRef<FormikProps<FormValues> | null>(null);

  const { allocationItem, setAllocationItem, setGroupAccount } = useContext(SelectedContext);

  const dispatch = useDispatchApp();

  const [loading, setLoading] = useState(false);
  const [initialSizesPane, setInitialSizesPane] = useState([50, 50]);
  const [isFirstRowSelected, setFirstRowSelected] = useState(false);

  const onReply = useCallback(() => {
    setLoading(true);

    const values = Object.values(itemsChanged);
    const replyParams: ReplyClarificationPayload = {
      status,
      company_no: companyNo,
      data: values.map((item) => ({
        id: item.id,
        invoice_id: item.invoiceId,
        invoice_position_id: item.invoicePositionId,
        account_id: item.accountId,
        account_no: item.accountNo,
        system_account_id: item.systemAccountId,
        system_account_no: item.systemAccountNo,
        next_status: item.replyStatus,
        reply: item.replyComment
      }))
    };

    toast.promise(
      dispatch(replyClarification(replyParams))
        .then((response) => {
          const payload = response.payload as AxiosResponse;
          if (!payload || payload?.data?.status !== HttpStatusCode.Ok) {
            throw new Error(t('app.system.error.internal-server'));
          }

          getData(() => {
            setFirstRowSelected(false);
          });
          onItemsChanged({});
        })
        .finally(() => {
          setLoading(false);
        }),
      {
        loading: t('app.system.loading.saving'),
        success: t('app.system.saved.success'),
        error: (error) => `${error.message || error || t('app.system.error.message')}`
      }
    );
  }, [companyNo, dispatch, getData, itemsChanged, onItemsChanged, status, t]);

  const onSave = useCallback(() => {
    if (loading || !status || !companyNo) {
      return;
    }

    const values = Object.values(itemsChanged);

    if (!values.length) {
      toast.error(t('app.system.saved.no-changed'));
      return;
    }

    if (allowedStatusReplyClarification.includes(status)) {
      onReply();
      return;
    }

    setLoading(true);

    const detailParams = {
      status,
      company_no: companyNo,
      data: values.map((item) => ({
        id: item.id,
        invoice_id: item.invoiceId,
        invoice_position_id: item.invoicePositionId,
        account_id: item.accountId,
        account_no: item.accountNo,
        system_account_id: item.systemAccountId,
        system_account_no: item.systemAccountNo
      }))
    };

    toast.promise(
      dispatch(saveAllocationItemsDetail(detailParams))
        .then((response) => {
          const payload = response.payload as AxiosResponse;
          if (!payload || payload?.data?.status !== HttpStatusCode.Ok) {
            throw new Error(t('app.system.error.internal-server'));
          }

          getData(() => {
            setFirstRowSelected(false);
          });
          onItemsChanged({});
        })
        .finally(() => {
          setLoading(false);
        }),
      {
        loading: t('app.system.loading.saving'),
        success: t('app.system.saved.success'),
        error: (error) => `${error.message || error || t('app.system.error.message')}`
      }
    );
  }, [companyNo, dispatch, getData, itemsChanged, loading, onItemsChanged, onReply, status, t]);

  const onSubmit = useCallback(
    (values: FormValues) => {
      const { replyStatus, replyComment, groupAccount, systemAccount } = values;

      if (!allocationItem || !groupAccount || !systemAccount) {
        return;
      }

      setGroupAccount(groupAccount);

      const detail = {
        status: 'local-checked',
        accountId: groupAccount.id,
        accountNo: groupAccount.accountNo,
        accountName: groupAccount.accountName,
        systemAccountId: systemAccount.id,
        systemAccountNo: systemAccount.accountNo,
        systemAccountName: systemAccount.accountName,
        replyStatus,
        replyComment
      };

      const referenceDetail = details.filter(
        (detail) =>
          detail.id !== allocationItem.id &&
          detail.itemName === allocationItem.itemName &&
          !allowedStatusReplyClarification.includes(status)
      );

      const referenceDetailChanged = referenceDetail.reduce(
        (accumulator, current) => {
          accumulator[current.id] = {
            ...detail,
            id: current.id,
            invoiceId: current.invoiceId,
            invoicePositionId: current.invoicePositionId
          };
          return accumulator;
        },
        {} as { [itemId: string]: AllocationItemsDetailChanged }
      );

      dispatch(
        allocationItemsAction.setAllocationItemsDetailById({
          data: {
            id: allocationItem.id,
            referenceIds: referenceDetail.map((item) => item.id),
            detail
          },
          params: { companyNo, status }
        })
      );

      onItemsChanged({
        ...itemsChanged,
        ...referenceDetailChanged,
        [allocationItem.id]: {
          ...detail,
          id: allocationItem.id,
          invoiceId: allocationItem.invoiceId,
          invoicePositionId: allocationItem.invoicePositionId
        }
      });
    },
    [allocationItem, details, dispatch, companyNo, status, setGroupAccount, onItemsChanged, itemsChanged]
  );

  const columns = useColumns(t);
  const countItemsNew = useMemo(() => details.filter((item) => item.status === status).length, [details, status]);

  useEffect(() => {
    if (isFirstRowSelected) {
      return;
    }

    if (details.length > 0) {
      setAllocationItem(details[0]);
    }

    setFirstRowSelected(true);
  }, [isFirstRowSelected, details, setAllocationItem]);

  const onNextItem = useCallback(() => {
    if (!formikRef.current) {
      return;
    }

    const formik = formikRef.current;

    if (!formik.isValid) {
      const keyNames = getFormKeyNames(t);
      toast(
        () => (
          <div>
            <div>{t('app.form.validation.invalid')}</div>
            {Object.entries(formik.errors).map(([key, value]) => (
              <div key={key}>
                <strong style={{ marginLeft: 10 }}>- {keyNames[key as keyof typeof keyNames]}</strong>: {value}
              </div>
            ))}
          </div>
        ),
        { position: 'top-center' }
      );
      return;
    }

    if (allocationItem) {
      const currentIndex = details.findIndex((detail) => allocationItem.id === detail.id);
      if (currentIndex < details.length - 1) {
        formik.resetForm();
        setAllocationItem(details[currentIndex + 1]);
      }
    }
  }, [allocationItem, details, setAllocationItem, t]);

  const onLayoutRenderDetail = useCallback(() => {
    const wrapperHeight = viewRef.current?.clientHeight || 0;
    const containerHeight = detailRef.current?.containerHeight || 0;
    const sizePaneDefault = Math.ceil((containerHeight / wrapperHeight) * 100 + 5);
    setInitialSizesPane([sizePaneDefault, 100 - sizePaneDefault]);
  }, []);

  const onRowSelectionModelChange = useCallback(
    (model: GridRowSelectionModel) => {
      const detail = details.find((item) => item.id === model[0]);
      setAllocationItem(detail ?? null);
    },
    [details, setAllocationItem]
  );

  const detailsProxy = useMemo(
    () => details.filter((item) => item.status === status || item.status === 'local-checked'),
    [details, status]
  );

  useImperativeHandle(ref, () => {
    return {
      save() {
        onSave();
      },
      submitForm() {
        formikRef.current?.submitForm();
      },
      toggleVisibleFilePdf() {
        detailRef.current?.toggleVisibleFilePdf();
      },
      onFirstRowSelected(status: boolean) {
        setFirstRowSelected(status);
      }
    };
  }, [onSave]);

  usePromptNotSaved(type === 'items' && Object.values(itemsChanged).length > 0);

  return (
    <View ref={viewRef} flexGrow={1}>
      <SplitPane
        ref={splitPaneRef}
        split='horizontal'
        hideSashContent={!isFirstRowSelected}
        initialSizesPane={initialSizesPane}
        initialSizesPaneClose={[100, 0]}
      >
        <Pane minSize='30%' maxSize='80%' style={{ display: 'flex' }}>
          <Section style={{ padding: '5px 0' }} flexGrow={1}>
            {allocationItem && (
              <Suspense fallback={<LinearProgress />}>
                <Formik
                  innerRef={formikRef}
                  initialValues={initialValues}
                  validationSchema={validationSchema(t, status)}
                  onSubmit={onSubmit}
                >
                  <Detail
                    ref={detailRef}
                    loading={loading}
                    onLoading={setLoading}
                    onNextItem={onNextItem}
                    onLayoutRender={onLayoutRenderDetail}
                    openSplitPane={(sizePane.split('-').map(Number)[1] || 0) !== 0}
                    onCloseSplitPane={() => splitPaneRef.current?.switchPane('close')}
                  />
                </Formik>
              </Suspense>
            )}
          </Section>
        </Pane>
        <Pane minSize='40%' maxSize='80%' style={{ display: 'flex' }}>
          <Section style={{ padding: '20px 10px' }} flexGrow={1} gap={1}>
            <TopBar countItemsNew={countItemsNew} countItemsTotal={details.length} />
            <DataGrid
              name='allocation.items.update'
              rows={detailsProxy}
              autoHeight={false}
              columns={columns}
              getRowId={(row) => row.id}
              loading={detailsStatus === 'loading'}
              rowSelectionModel={allocationItem ? [allocationItem.id] : []}
              onRowSelectionModelChange={onRowSelectionModelChange}
            />
          </Section>
        </Pane>
      </SplitPane>
    </View>
  );
});

Main.displayName = 'Main';

export default Main;
