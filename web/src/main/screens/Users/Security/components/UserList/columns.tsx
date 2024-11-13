import { GridColDef } from '@mui/x-data-grid';
import { TFunction } from 'i18next';
import { Checkbox } from '@mui/material';

export const useColumns = (t: TFunction<'translation', undefined>, onCheckboxChange: (id: string) => void): GridColDef[] => {
  return [
    {
      flex: 0.1,
      field: 'checkbox',
      headerName: '', 
      renderCell: (params) => (
        <Checkbox
          color="primary"
          onChange={() => onCheckboxChange(params.row.id)} 
        />
      ),
      sortable: false, 
    },
    {
      flex: 1,
      width: 200,
      field: 'Name',
      headerName: t('app.users.users-roles.columns.name'),
      sortingOrder: ['desc', 'asc', null],
    },
    {
      width: 230,
      field: 'Description',
      headerName: t('app.users.users-roles.columns.description'),
      sortingOrder: ['desc', 'asc', null],
    },
  ];
};
