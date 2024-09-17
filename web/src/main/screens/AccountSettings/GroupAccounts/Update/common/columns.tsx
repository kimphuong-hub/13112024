import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { TFunction } from 'i18next';
import { CellAccountName, CellAllocatedItems, CellChecked, CellSystemAccountName } from '../components/CellColumns';

export const useColumns = (
  t: TFunction<'translation', undefined>,
  {
    onChecked,
    hiddenChecked = false
  }: {
    onChecked?: (id: string, checked: boolean) => void;
    hiddenChecked?: boolean;
  } = {}
): GridColDef[] => [
  ...(!hiddenChecked
    ? [
        {
          width: 70,
          field: 'status',
          headerName: 'Checked',
          hideable: false,
          renderCell: (props: GridRenderCellParams) => <CellChecked onChecked={onChecked} {...props} />
        }
      ]
    : []),
  {
    width: 120,
    field: 'accountNo',
    headerName: t('app.account-settings.group-accounts-detail.columns.number')
  },
  {
    flex: 1,
    minWidth: 380,
    field: 'accountName',
    headerName: t('app.account-settings.group-accounts-detail.columns.name'),
    renderCell: CellAccountName
  },
  {
    width: 120,
    field: 'systemAccountNo',
    headerName: t('app.account-settings.group-accounts-detail.columns.global-account-number')
  },
  {
    flex: 1,
    minWidth: 380,
    field: 'systemAccountName',
    headerName: t('app.account-settings.group-accounts-detail.columns.global-account-name'),
    renderCell: CellSystemAccountName
  },
  {
    width: 150,
    field: 'userMapping',
    headerName: t('app.account-settings.group-accounts-detail.columns.user-mapping')
  },
  {
    width: 120,
    type: 'number',
    field: 'totalItems',
    headerName: t('app.account-settings.group-accounts-detail.columns.allocated-items'),
    renderCell: CellAllocatedItems,
    sortingOrder: ['desc', 'asc', null]
  },
  {
    width: 150,
    field: 'lastAllocation',
    headerName: t('app.account-settings.group-accounts-detail.columns.last-allocation')
  }
];
