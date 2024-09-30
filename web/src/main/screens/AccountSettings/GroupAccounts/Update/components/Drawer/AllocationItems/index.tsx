import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import DataGrid from '~/base/components/Material/DataGrid';
import Typography from '~/base/components/Material/Typography';
import View from '~/base/components/Material/View';
import Section from '~/base/components/Material/View/Section';
import { GroupDetailResponse } from '~/main/features/account-settings/group-accounts/types';
import { getItemsByGroupAndAccount } from '~/main/features/items/action';
import { useDispatchApp, useSelectorApp } from '~/redux/store';
import { useColumns } from './common/columns';

type Props = GroupDetailResponse;

const GroupAccountsAllocationItems = (props: Props) => {
  const { accountNo, accountName, companyNo, systemAccountNo, systemAccountName } = props;
  const { innerHeight: height } = window;

  const { t } = useTranslation();

  const dispatch = useDispatchApp();
  const { items: defaultItems } = useSelectorApp((state) => state.allocation.items.groupAccountDrawer);
  const { data: items = [], status: itemsStatus } = defaultItems[companyNo]?.[accountNo] || {};

  const getData = useCallback(() => {
    dispatch(getItemsByGroupAndAccount({ accountNo, companyNo }));
  }, [accountNo, companyNo, dispatch]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <Section height={height / 1.8} gap='20px'>
      <View flexWrap='wrap' flexDirection='row' justifyContent='space-between' alignItems='center' columnGap={5}>
        <Typography fontSize={15}>
          {`${accountNo ? `(${accountNo})` : ''} ${accountName}`}
          {`${systemAccountNo && systemAccountName ? ` - ${systemAccountNo ? `(${systemAccountNo})` : ''} ${systemAccountName}` : ''}`}
        </Typography>
      </View>
      <DataGrid
        rows={items}
        autoHeight={false}
        columns={useColumns(t)}
        getRowId={(row) => row.id}
        loading={itemsStatus === 'loading'}
      />
    </Section>
  );
};

export default GroupAccountsAllocationItems;
