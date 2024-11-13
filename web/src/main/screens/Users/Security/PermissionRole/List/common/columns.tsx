import { GridColDef } from '@mui/x-data-grid';
import { TFunction } from 'i18next';

export const useColumns = (t: TFunction<'translation', undefined>): GridColDef[] => [
  {
    width: 100,
    field: 'PermissionId',
    headerName: t('app.users.users.columns.permissionid')
  },
  {
    width: 120,
    field: 'SecurityRole_Ref',
    headerName: t('app.users.users.columns.securityrole_ref')
  },
  {
    flex: 1,
    minWidth: 300,
    field: 'UpdateBy',
    headerName: t('app.users.users.columns.updateby')
  },
  {
    width: 120,
    type: 'number',
    field: 'LastUpdate',
    headerName: t('app.users.users.columns.lastupdate'),
    sortingOrder: ['desc', 'asc', null]
  }
];
