import { GridColDef } from '@mui/x-data-grid';
import { TFunction } from 'i18next';

export const useColumnsItems = (t: TFunction<'translation', undefined>): GridColDef[] => [
  {
    width: 100,
    field: 'itemNumber',
    headerName: t('app.allocation.items.info.columns.item-number')
  },
  {
    flex: 1,
    minWidth: 150,
    field: 'itemName',
    headerName: t('app.allocation.items.info.columns.item-name')
  },
  {
    width: 100,
    field: 'unit',
    headerName: t('app.allocation.items.info.columns.unit')
  },
  {
    width: 100,
    field: 'vat',
    headerName: t('app.allocation.items.info.columns.vat')
  },
  {
    width: 150,
    field: 'supplierName',
    headerName: t('app.allocation.items.info.columns.supplier')
  }
];

export const useColumnsAccounts = (t: TFunction<'translation', undefined>): GridColDef[] => [
  {
    flex: 1,
    minWidth: 150,
    type: 'number',
    field: 'accountNo',
    headerName: t('app.account-settings.group-accounts-detail.columns.number'),
    align: 'left',
    headerAlign: 'left'
  },
  {
    flex: 1,
    minWidth: 150,
    field: 'accountName',
    headerName: t('app.account-settings.group-accounts-detail.columns.name')
  },
  {
    flex: 1,
    minWidth: 150,
    field: 'systemAccountNo',
    headerName: t('app.account-settings.group-accounts-detail.columns.global-account-number')
  },
  {
    flex: 1,
    minWidth: 150,
    field: 'systemAccountName',
    headerName: t('app.account-settings.group-accounts-detail.columns.global-account-name')
  }
];
