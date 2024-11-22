import { GridColDef } from '@mui/x-data-grid';
import { TFunction } from 'i18next';

export const useColumns = (t: TFunction<'translation', undefined>): GridColDef[] => [
  {
    width: 100,
    field: 'permission1',
    headerName: t('app.permission.columns.permission1')
  },
  {
    width: 120,
    field: 'permission2',
    headerName: t('app.permission.columns.permission2')
  },
  {
    flex: 1,
    minWidth: 300,
    field: 'Verification',
    headerName: t('app.permission.columns.Verification')
  },
  {
    width: 120,
    type: 'number',
    field: 'Clarification1',
    headerName: t('app.permission.columns.Clarification1'),
  },
  {
    width: 120,
    type: 'number',
    field: 'Unsettled',
    headerName: t('app.permission.columns.Unsettled'),
  },
  {
    width: 120,
    type: 'number',
    field: 'Checked',
    headerName: t('app.permission.columns.Checked'),
    sortingOrder: ['desc', 'asc', null]
  },
  {
    width: 120,
    field: 'Invoices',
    headerName: t('app.permission.columns.Invoices'),
  },
  {
    width: 120,
    field: 'Items',
    headerName: t('app.permission.columns.Items'),
  },
  {
    width: 120,
    field: 'defaultAllocation',
    headerName: t('app.permission.columns.defaultallocation'),
  }
];
