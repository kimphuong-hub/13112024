import { TFunction } from 'i18next';
import { CellTotal } from '../components/CellColumns';
import { GridColDef } from '@mui/x-data-grid';

export const useColumns = (t: TFunction<'translation', undefined>): GridColDef[] => [
  {
    width: 150,
    field: 'companyNo',
    headerName: t('app.account-settings.group-accounts.columns.number')
  },
  {
    flex: 1,
    minWidth: 200,
    field: 'name',
    headerName: t('app.account-settings.group-accounts.columns.name')
  },
  {
    width: 150,
    field: 'partnerName',
    headerName: t('app.account-settings.group-accounts.columns.domain')
  },
  {
    width: 150,
    type: 'number',
    field: 'totalAccount',
    headerName: t('app.account-settings.group-accounts.columns.total-accounts'),
    renderCell: CellTotal,
    sortingOrder: ['desc', 'asc', null]
  },
  {
    width: 150,
    type: 'number',
    field: 'totalAccountMapped',
    headerName: t('app.account-settings.group-accounts.columns.mapped-accounts'),
    renderCell: CellTotal,
    sortingOrder: ['desc', 'asc', null]
  },
  {
    width: 150,
    type: 'number',
    field: 'totalAccountUnMapped',
    headerName: t('app.account-settings.group-accounts.columns.un-mapped-accounts'),
    renderCell: CellTotal,
    sortingOrder: ['desc', 'asc', null]
  },
  {
    width: 150,
    field: 'updatedAt',
    headerName: t('app.account-settings.group-accounts.columns.last-updated')
  }
];
