import { GridColDef } from '@mui/x-data-grid';
import { TFunction } from 'i18next';

export const useColumns = (t: TFunction<'translation', undefined>): GridColDef[] => {
  return [
    {
      field: 'id',
      headerName: t('app.users.users-roles.columns.id')
    },
    {
      flex: 1,
      width: 270,
      field: 'name',
      headerName: t('app.users.users-roles.columns.name'),
      sortingOrder: ['desc', 'asc', null]
    },
    {
      width: 500,
      field: 'description',
      headerName: t('app.users.users-roles.columns.description'),
      sortingOrder: ['desc', 'asc', null]
    }
  ];
};
