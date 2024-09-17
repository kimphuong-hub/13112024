import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { TFunction } from 'i18next';
import CellAction from '../components/CellAction';
import { CellAllocatedItems } from '../../../GroupAccounts/Update/components/CellColumns';

type Props = {
  onEdit: (id: string) => void;
};

export const useColumns = (t: TFunction<'translation', undefined>, props: Props): GridColDef[] => {
  const { onEdit } = props;

  return [
    {
      width: 150,
      field: 'accountNo',
      headerName: t('app.account-settings.global-accounts.columns.number')
    },
    {
      flex: 1,
      minWidth: 150,
      field: 'accountName',
      headerName: t('app.account-settings.global-accounts.columns.name')
    },
    {
      width: 150,
      field: 'companyNo',
      headerName: t('app.account-settings.global-accounts.columns.company-no')
    },
    {
      flex: 1,
      minWidth: 150,
      field: 'companyName',
      headerName: t('app.account-settings.global-accounts.columns.company-name')
    },
    {
      width: 150,
      field: 'userMapping',
      headerName: t('app.account-settings.global-accounts.columns.user-mapping')
    },
    {
      width: 120,
      type: 'number',
      field: 'totalItems',
      headerName: t('app.account-settings.global-accounts.columns.allocated-items'),
      renderCell: CellAllocatedItems,
      sortingOrder: ['desc', 'asc', null]
    },
    {
      width: 30,
      field: '0',
      headerName: '',
      sortable: false,
      hideable: false,
      renderCell: (props: GridRenderCellParams) => <CellAction onEdit={onEdit} {...props} />
    }
  ];
};
