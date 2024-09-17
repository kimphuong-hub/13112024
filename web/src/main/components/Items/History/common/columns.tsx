import { GridColDef } from '@mui/x-data-grid';
import { TFunction } from 'i18next';

export const useColumns = (t: TFunction<'translation', undefined>): GridColDef[] => [
  {
    flex: 1,
    minWidth: 100,
    field: 'itemName',
    headerName: t('app.allocation.items.history.columns.item-name')
  },
  {
    minWidth: 150,
    field: 'companyNo',
    headerName: t('app.allocation.items.history.columns.group-number')
  },
  {
    width: 150,
    field: 'allocationType',
    headerName: t('app.allocation.items.history.columns.allocation-type')
  },
  {
    width: 150,
    field: 'accountNumber',
    headerName: t('app.allocation.items.history.columns.account-number')
  },
  {
    width: 300,
    field: 'accountName',
    headerName: t('app.allocation.items.history.columns.account-name')
  },
  {
    width: 300,
    field: 'systemAccountName',
    headerName: t('app.allocation.items.history.columns.global-account')
  },
  {
    width: 150,
    field: 'accountingDate',
    headerName: t('app.allocation.items.history.columns.accounting-date')
  },
  {
    width: 150,
    field: 'score',
    headerName: t('app.allocation.items.history.columns.score'),
    renderCell: ({ value }) => `${Math.round(value * 100)}%`
  }
];
