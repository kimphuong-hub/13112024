import { LinearProgress } from '@mui/material';
import { GridRowSelectionModel } from '@mui/x-data-grid';
import { AxiosResponse, HttpStatusCode } from 'axios';
import { useFormik } from 'formik';
import {
  RefObject,
  Suspense,
  forwardRef,
  lazy,
  useCallback,
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
import { GroupAccountResponse } from '~/main/features/account-settings/group-accounts/types';
import { saveAllocationItemsDetail } from '~/main/features/allocation/items/action';
import { allocationItemsAction } from '~/main/features/allocation/items/slice';
import { AllocationItemsDetailChanged, AllocationItemsDetailResponse } from '~/main/features/allocation/items/types';
import usePromptNotSaved from '~/main/hooks/usePromptChanged';
import { useDispatchApp } from '~/redux/store';
import TopBar from './TopBar';
import { useColumns } from './common/columns';
import { FormValues, initialValues, validationSchema } from './common/form';

type Props = {
  type: 'items' | 'archives';
  getData: () => void;
  details: AllocationItemsDetailResponse[];
  detailsStatus: string;
  splitPaneRef: RefObject<{ sizesPane: number[]; switchPane: (status?: 'open' | 'close') => void }>;
  onSelectGroupAccount: (groupAccount: GroupAccountResponse | null) => void;
  onSelectAllocationItem: (allocationItem: AllocationItemsDetailResponse | null) => void;
};

const Detail = lazy(() => import('./components/Detail'));

const Main = forwardRef((props: Props, ref) => {
  const { type, getData, details, detailsStatus, splitPaneRef, onSelectGroupAccount, onSelectAllocationItem } = props;

  const { companyNo = '' } = useParams();

  const { t } = useTranslation();

  const [searchParams] = useSearchParams();
  const status = searchParams.get('status') || '';
  const sizePane = searchParams.get('size-pane') || '';

  const viewRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<{ containerHeight: number; toggleVisibleFilePdf: () => void }>(null);

  const dispatch = useDispatchApp();

  const [loading, setLoading] = useState(false);
  const [isFirstRowSelected, setFirstRowSelected] = useState(false);

  const [initialSizesPane, setInitialSizesPane] = useState([50, 50]);

  const [rowSelection, setRowSelection] = useState<GridRowSelectionModel>([]);

  const [itemsChanged, setItemsChanged] = useState<{
    [itemId: string]: AllocationItemsDetailChanged;
  }>({});

  const detailSelected = useMemo(
    () => details.find((detail) => rowSelection.includes(`${detail.id}`)),
    [details, rowSelection]
  );

  const onNextItem = useCallback(() => {
    const currentIndex = details.findIndex((detail) => rowSelection.includes(detail.id));
    if (currentIndex < details.length - 1) {
      setRowSelection([`${details[currentIndex + 1].id}`]);
    } else {
      setRowSelection([`${details[0].id}`]);
    }
  }, [details, rowSelection]);

  const onSave = useCallback(() => {
    if (loading || !status || !companyNo) {
      return;
    }

    const itemsChangedData = Object.values(itemsChanged);

    if (!itemsChangedData.length) {
      toast.error(t('app.system.saved.no-changed'));
      return;
    }

    setLoading(true);

    const itemsChangedParams = {
      status,
      company_no: companyNo,
      data: itemsChangedData.map((item) => ({
        id: item.id || '',
        invoice_id: item.invoiceId || 0,
        invoice_position_id: item.invoicePositionId || 0,
        account_id: item.accountId || '',
        account_no: item.accountNo || '',
        system_account_id: `${item.systemAccountId || 0}`,
        system_account_no: `${item.systemAccountNo || 0}`
      }))
    };

    toast.promise(
      dispatch(saveAllocationItemsDetail(itemsChangedParams))
        .then((response) => {
          const payload = response.payload as AxiosResponse;
          if (!payload || payload?.data?.status !== HttpStatusCode.Ok) {
            throw new Error(t('app.system.error.internal-server'));
          }

          // filter items not change and select first (keep top detail when save)
          const itemsChangedIds = itemsChangedData.map((item) => item.id);
          const itemsNotChanged = details.filter((item) => !itemsChangedIds.includes(item.id));
          setRowSelection([`${itemsNotChanged[0].id}`]);

          setItemsChanged({});
          getData();
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
  }, [companyNo, details, dispatch, getData, itemsChanged, loading, status, t]);

  const onSubmit = useCallback(
    (values: FormValues) => {
      const { groupAccount, systemAccount } = values;

      if (!detailSelected || !groupAccount || !systemAccount) {
        return;
      }

      const itemsChanged = {
        // set status for UI counter
        status: 'checked',
        accountId: groupAccount.id,
        accountNo: groupAccount.accountNo,
        accountName: groupAccount.accountName,
        systemAccountId: systemAccount.id,
        systemAccountNo: systemAccount.accountNo,
        systemAccountName: systemAccount.accountName
      };

      dispatch(
        allocationItemsAction.setAllocationItemsDetailById({
          data: { id: detailSelected.id, details: itemsChanged },
          params: { companyNo, status }
        })
      );

      setItemsChanged((prev) => ({
        ...prev,
        [detailSelected.id]: {
          ...itemsChanged,
          id: detailSelected.id,
          status,
          invoiceId: detailSelected.invoiceId,
          invoicePositionId: detailSelected.invoicePositionId
        }
      }));

      onNextItem();
    },
    [companyNo, detailSelected, dispatch, onNextItem, status]
  );

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema(t),
    onSubmit
  });

  const { values } = formik;

  const columns = useColumns(t);

  const countItemsNew = useMemo(() => details.filter((item) => item.status === status).length, [details, status]);

  useEffect(() => {
    // select first row
    if (isFirstRowSelected) {
      return;
    }

    if (details.length > 0) {
      setRowSelection([`${details[0].id}`]);
      setFirstRowSelected(true);
    }
  }, [isFirstRowSelected, details]);

  useEffect(() => {
    // listen group account change
    onSelectGroupAccount(values.groupAccount);
  }, [onSelectGroupAccount, values.groupAccount]);

  useEffect(() => {
    // listen allocation items change
    onSelectAllocationItem(detailSelected ?? null);
  }, [detailSelected, onSelectAllocationItem]);

  useEffect(() => {
    if (detailSelected?.accountId) {
      formik.setFieldValue('groupAccount', {
        id: detailSelected.accountId,
        accountNo: detailSelected.accountNo,
        accountName: detailSelected.accountName
      });
    } else {
      formik.setFieldValue('groupAccount', null);
    }

    if (detailSelected?.systemAccountId) {
      formik.setFieldValue('systemAccount', {
        id: detailSelected.systemAccountId,
        accountNo: detailSelected.systemAccountNo,
        accountName: detailSelected.systemAccountName
      });
    } else {
      formik.setFieldValue('systemAccount', null);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailSelected]);

  const onLayoutRenderDetail = useCallback(() => {
    const wrapperHeight = viewRef.current?.clientHeight || 0;
    const containerHeight = detailRef.current?.containerHeight || 0;
    const sizePaneDefault = Math.ceil((containerHeight / wrapperHeight) * 100 + 5);
    setInitialSizesPane([sizePaneDefault, 100 - sizePaneDefault]);
  }, []);

  useImperativeHandle(ref, () => {
    return {
      save() {
        onSave();
      },
      toggleVisibleFilePdf() {
        detailRef.current?.toggleVisibleFilePdf();
      }
    };
  }, [onSave]);

  usePromptNotSaved(type === 'items' && Object.values(itemsChanged).length > 0);

  return (
    <View ref={viewRef} flexGrow={1}>
      <SplitPane
        ref={splitPaneRef}
        split='horizontal'
        loading={isFirstRowSelected}
        initialSizesPane={initialSizesPane}
        initialSizesPaneClose={[100, 0]}
      >
        <Pane minSize='30%' maxSize='80%' style={{ display: 'flex' }}>
          <Section style={{ padding: '5px 0' }} flexGrow={1}>
            {detailSelected && (
              <Suspense fallback={<LinearProgress />}>
                <Detail
                  ref={detailRef}
                  formik={formik}
                  loading={loading}
                  detail={detailSelected}
                  onLoading={setLoading}
                  onLayoutRender={onLayoutRenderDetail}
                  openSplitPane={(sizePane.split('-').map(Number)[1] || 0) !== 0}
                  onCloseSplitPane={() => splitPaneRef.current?.switchPane('close')}
                />
              </Suspense>
            )}
          </Section>
        </Pane>
        <Pane minSize='40%' maxSize='80%' style={{ display: 'flex' }}>
          <Section style={{ padding: '20px 10px' }} flexGrow={1} gap={1}>
            <TopBar countItemsNew={countItemsNew} countItemsTotal={details.length} />
            <DataGrid
              name='allocation.items.update'
              rows={details}
              autoHeight={false}
              columns={columns}
              getRowId={(row) => row.id}
              loading={detailsStatus === 'loading'}
              rowSelectionModel={rowSelection}
              onRowSelectionModelChange={(model) => setRowSelection(model)}
            />
          </Section>
        </Pane>
      </SplitPane>
    </View>
  );
});

Main.displayName = 'Main';

export default Main;
