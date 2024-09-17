import { GridRowSelectionModel } from '@mui/x-data-grid';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DataGrid from '~/base/components/Material/DataGrid';
import View from '~/base/components/Material/View';
import Section from '~/base/components/Material/View/Section';
import { getGroupAccountsByCompanyNo } from '~/main/features/account-settings/group-accounts/action';
import { getItemsByGroupAndAccount } from '~/main/features/items/action';
import { useDispatchApp, useSelectorApp } from '~/redux/store';
import { useColumnsAccounts, useColumnsItems } from './common/columns';

type Props = {
  companyNo?: string;
  groupAccountId?: string;
};

const DetailGroupAccounts = (props: Props) => {
  const { companyNo = 0, groupAccountId } = props;

  const { t } = useTranslation();
  const { innerHeight: height } = window;

  const dispatch = useDispatchApp();

  const { items: defaultItems, accounts: defaultAccounts } = useSelectorApp(
    (state) => state.allocation.items.groupAccountDrawer
  );
  const { data: accounts = [], status: accountsStatus } = defaultAccounts[companyNo] || {};

  const [rowSelection, setRowSelection] = useState<GridRowSelectionModel>([]);

  useEffect(() => {
    if (accounts.length > 0 && groupAccountId) {
      setRowSelection([groupAccountId]);
    }
  }, [accounts.length, groupAccountId]);

  useEffect(() => {
    dispatch(getGroupAccountsByCompanyNo({ companyNo }));
  }, [dispatch, companyNo]);

  const accountSelected = useMemo(
    () => accounts.find((account) => account.id === rowSelection[0]),
    [accounts, rowSelection]
  );

  const accountNo = accountSelected?.accountNo || '';
  const { data: items = [], status: itemsStatus } = defaultItems[companyNo]?.[accountNo] || {};

  useEffect(() => {
    if (accountNo) {
      dispatch(getItemsByGroupAndAccount({ companyNo, accountNo }));
    }
  }, [accountNo, dispatch, companyNo]);

  return (
    <Section flexDirection='row' height={height / 1.6} gap='20px'>
      <View width='calc(40% - 10px)' flexGrow={1}>
        <DataGrid
          rows={accounts}
          columns={useColumnsAccounts(t)}
          getRowId={(row) => row.id}
          loading={accountsStatus === 'loading'}
          initialState={{ sorting: { sortModel: [{ field: 'accountNo', sort: 'asc' }] } }}
          rowSelectionModel={rowSelection}
          onRowSelectionModelChange={(model) => setRowSelection(model)}
        />
      </View>
      <View width='calc(60% - 10px)' flexGrow={1}>
        <DataGrid
          rows={items}
          columns={useColumnsItems(t)}
          getRowId={(row) => row.id}
          loading={itemsStatus === 'loading'}
        />
      </View>
    </Section>
  );
};

export default DetailGroupAccounts;
