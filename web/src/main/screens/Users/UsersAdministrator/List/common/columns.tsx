import { GridColDef } from '@mui/x-data-grid';
import { TFunction } from 'i18next';

export const useColumns = (t: TFunction<'translation', undefined>): GridColDef[] => [
  {
    flex: 1,
    field: 'name',
    headerName: t('app.users.users-administrator.columns.name')
  },
  {
    flex: 1,
    field: 'email',
    headerName: t('app.users.users-administrator.columns.email')
  }
];
