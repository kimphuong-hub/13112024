import { GridColDef } from '@mui/x-data-grid';
import { TFunction } from 'i18next';

export const useInvoicesOverviewColumns = (t: TFunction<'translation', undefined>): GridColDef[] => [
  {
    flex: 1,
    minWidth: 60,
    field: 'date',
    headerName: t('app.home.invoices-overview.columns.date')
  },
  {
    flex: 1,
    minWidth: 60,
    field: 'dayName',
    headerName: t('app.home.invoices-overview.columns.day-name')
  },
  {
    flex: 1,
    minWidth: 60,
    type: 'number',
    field: 'totalInvoices',
    headerName: t('app.home.invoices-overview.columns.invoices')
  },
  {
    flex: 1,
    minWidth: 60,
    type: 'number',
    field: 'totalItems',
    headerName: t('app.home.invoices-overview.columns.items')
  },
  {
    flex: 1,
    minWidth: 120,
    type: 'number',
    field: 'totalDefaultAllocation',
    headerName: t('app.home.invoices-overview.columns.default-allocation')
  },
  {
    flex: 1,
    minWidth: 120,
    type: 'number',
    field: 'totalLastAllocation',
    headerName: t('app.home.invoices-overview.columns.last-allocation')
  },
  {
    flex: 1,
    minWidth: 120,
    type: 'number',
    field: 'totalNewAllocation',
    headerName: t('app.home.invoices-overview.columns.new-allocation')
  }
];
