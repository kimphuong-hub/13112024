import { GridColDef } from '@mui/x-data-grid';
import { TFunction } from 'i18next';

export const useColumns = (t: TFunction<'translation', undefined>): GridColDef[] => [
  {
    width: 50,
    field: 'id',
    headerName: t('app.allocation.items.clarification.columns.id')
  },
  {
    width: 150,
    field: 'name',
    headerName: t('app.allocation.items.clarification.columns.name')
  },
  {
    flex: 1,
    minWidth: 100,
    field: 'comment',
    headerName: t('app.allocation.items.clarification.columns.comment')
  }
];
