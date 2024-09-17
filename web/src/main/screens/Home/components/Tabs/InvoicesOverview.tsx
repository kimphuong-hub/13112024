import moment from 'moment';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import DataGrid from '~/base/components/Material/DataGrid';
import { getDashboardInvoiceOverview } from '~/main/features/dashboard/action';
import { useDispatchApp, useSelectorApp } from '~/redux/store';
import { useInvoicesOverviewColumns } from '../../common/columns';

const TabInvoicesOverview = () => {
  const { t } = useTranslation();

  const [searchParams] = useSearchParams();
  const toDate = searchParams.get('to-date') || moment().format('YYYY-MM-DD');
  const fromDate = searchParams.get('from-date') || moment().day(-7).format('YYYY-MM-DD');

  const dispatch = useDispatchApp();
  const { invoicesOverview: defaultInvoiceOverview } = useSelectorApp((state) => state.dashboard);

  const { data: invoicesOverview, status: statusInvoicesOverview } = defaultInvoiceOverview || {};

  const getData = useCallback(() => {
    dispatch(getDashboardInvoiceOverview({ toDate, fromDate }));
  }, [dispatch, fromDate, toDate]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <DataGrid
      rows={invoicesOverview}
      columns={useInvoicesOverviewColumns(t)}
      loading={statusInvoicesOverview === 'loading'}
      initialState={{ sorting: { sortModel: [{ field: 'date', sort: 'desc' }] } }}
      hideFooter
    />
  );
};

export default TabInvoicesOverview;
