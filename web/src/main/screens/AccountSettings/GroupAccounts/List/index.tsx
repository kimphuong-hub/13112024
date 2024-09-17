import { GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import DataGrid from '~/base/components/Material/DataGrid';
import View from '~/base/components/Material/View';
import Section from '~/base/components/Material/View/Section';
import LayoutWrapper from '~/base/layout/Wrapper';
import { getGroups } from '~/main/features/account-settings/group-accounts/action';
import { groupAccountsAction } from '~/main/features/account-settings/group-accounts/slice';
import { useDispatchApp, useSelectorApp } from '~/redux/store';
import TopBar from './TopBar';
import { useColumns } from './common/columns';

const AccountSettingsGroupAccountsListScreen = () => {
  const { t } = useTranslation();

  const [searchParams] = useSearchParams();
  const searchValue = searchParams.get('q') || '';

  const dispatch = useDispatchApp();
  const {
    data: { rows: groups, total },
    status,
    sort,
    pagination
  } = useSelectorApp((state) => state.accountSettings.groupAccounts.groups);

  const getData = useCallback(() => {
    dispatch(getGroups({ sort, pagination, search: searchValue }));
  }, [dispatch, pagination, searchValue, sort]);

  useEffect(() => {
    getData();
  }, [getData]);

  const onSortModelChange = useCallback(
    (model: GridSortModel) => dispatch(groupAccountsAction.setGroupsSort(model)),
    [dispatch]
  );

  const onPaginationModelChange = useCallback(
    (model: GridPaginationModel) => dispatch(groupAccountsAction.setGroupsPagination(model)),
    [dispatch]
  );

  return (
    <LayoutWrapper
      title={t('app.title.account-settings.group-accounts')}
      breadcrumbs={{ title: t('app.breadcrumb.account-settings') }}
    >
      <View p='20px' flexGrow={1}>
        <Section flexGrow={1} gap={1}>
          <TopBar />
          <DataGrid
            name='account-settings.group-accounts'
            rows={groups}
            rowCount={total}
            columns={useColumns(t)}
            getRowId={(row) => row.id}
            loading={status === 'loading'}
            initialState={{
              pagination: { paginationModel: { page: pagination?.page, pageSize: pagination?.pageSize } }
            }}
            sortingMode='server'
            onSortModelChange={onSortModelChange}
            paginationMode='server'
            onPaginationModelChange={onPaginationModelChange}
          />
        </Section>
      </View>
    </LayoutWrapper>
  );
};

export default AccountSettingsGroupAccountsListScreen;
