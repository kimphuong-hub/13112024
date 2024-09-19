import { GridColDef } from '@mui/x-data-grid';
import { TFunction } from 'i18next';
import { CellTotal } from '../components/CellColumns';

export const useColumns = (t: TFunction<'translation', undefined>): GridColDef[] => [
  {
    width: 100,
    field: 'reseller',
    headerName: t('app.allocation.items.columns.domain')
  },
  {
    width: 120,
    field: 'companyNo',
    headerName: t('app.allocation.items.columns.group-number')
  },
  {
    flex: 1,
    minWidth: 300,
    field: 'companyName',
    headerName: t('app.allocation.items.columns.group-name')
  },
  {
    width: 120,
    type: 'number',
    field: 'allocation1',
    headerName: t('app.allocation.items.columns.allocation1'),
    renderCell: CellTotal,
    sortingOrder: ['desc', 'asc', null]
  },
  {
    width: 120,
    type: 'number',
    field: 'allocation2',
    headerName: t('app.allocation.items.columns.allocation2'),
    renderCell: CellTotal,
    sortingOrder: ['desc', 'asc', null]
  },
  {
    width: 120,
    type: 'number',
    field: 'verification',
    headerName: t('app.allocation.items.columns.verification'),
    renderCell: CellTotal,
    sortingOrder: ['desc', 'asc', null]
  },
  {
    width: 120,
    type: 'number',
    field: 'checked',
    headerName: t('app.allocation.items.columns.checked'),
    renderCell: CellTotal,
    sortingOrder: ['desc', 'asc', null]
  },
  {
    width: 120,
    type: 'number',
    field: 'invoices',
    headerName: t('app.allocation.items.columns.invoices'),
    sortingOrder: ['desc', 'asc', null]
  },
  {
    width: 120,
    type: 'number',
    field: 'items',
    headerName: t('app.allocation.items.columns.items'),
    sortingOrder: ['desc', 'asc', null]
  },
  {
    width: 120,
    type: 'number',
    field: 'defaultAllocation',
    headerName: t('app.allocation.items.columns.default-allocation'),
    sortingOrder: ['desc', 'asc', null]
  },
  {
    width: 120,
    type: 'number',
    field: 'lastAllocation',
    headerName: t('app.allocation.items.columns.last-allocation'),
    sortingOrder: ['desc', 'asc', null]
  },
  {
    width: 120,
    type: 'number',
    field: 'newItems',
    headerName: t('app.allocation.items.columns.new-allocation'),
    sortingOrder: ['desc', 'asc', null]
  }
];
