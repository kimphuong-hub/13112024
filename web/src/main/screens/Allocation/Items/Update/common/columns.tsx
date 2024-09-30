import { GridColDef } from '@mui/x-data-grid';
import { TFunction } from 'i18next';

export const useColumns = (t: TFunction<'translation', undefined>): GridColDef[] => {
  return [
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
      field: 'net',
      headerName: t('app.allocation.items.info.columns.net-price')
    },
    {
      width: 100,
      field: 'vat',
      headerName: t('app.allocation.items.info.columns.vat')
    },
    {
      flex: 1,
      minWidth: 150,
      field: 'systemAccountName',
      headerName: t('app.allocation.items.info.columns.global-account')
    }
  ];
};
