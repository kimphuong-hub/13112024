import { GridColDef } from '@mui/x-data-grid';
import { TFunction } from 'i18next';
import { CellTotal } from '../components/CellColumns';

export const useColumns = (t: TFunction<'translation', undefined>): GridColDef[] => [
  {
    width: 100,
    field: 'reseller',
    headerName: t('app.allocation.archives.columns.domain')
  },
  {
    width: 120,
    field: 'companyNo',
    headerName: t('app.allocation.archives.columns.group-number')
  },
  {
    flex: 1,
    minWidth: 300,
    field: 'companyName',
    headerName: t('app.allocation.archives.columns.group-name')
  },
  {
    width: 120,
    type: 'number',
    field: 'invoices',
    headerName: t('app.allocation.archives.columns.invoices'),
    sortingOrder: ['desc', 'asc', null]
  },
  {
    width: 120,
    type: 'number',
    field: 'items',
    headerName: t('app.allocation.archives.columns.items'),
    sortingOrder: ['desc', 'asc', null]
  },
  {
    width: 120,
    type: 'number',
    field: 'defaultAllocation',
    headerName: t('app.allocation.archives.columns.default-allocation'),
    sortingOrder: ['desc', 'asc', null]
  },
  {
    width: 120,
    type: 'number',
    field: 'lastAllocation',
    headerName: t('app.allocation.archives.columns.last-allocation'),
    sortingOrder: ['desc', 'asc', null]
  },
  {
    width: 120,
    type: 'number',
    field: 'newItems',
    headerName: t('app.allocation.archives.columns.new-allocation'),
    sortingOrder: ['desc', 'asc', null]
  },
  {
    width: 120,
    type: 'number',
    field: 'exported',
    headerName: t('app.allocation.archives.columns.exported'),
    renderCell: CellTotal,
    sortingOrder: ['desc', 'asc', null]
  }
];
