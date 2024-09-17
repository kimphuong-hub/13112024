import { GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import DataGrid from '~/base/components/Material/DataGrid';
import View from '~/base/components/Material/View';
import Section from '~/base/components/Material/View/Section';
import LayoutWrapper from '~/base/layout/Wrapper';
import { getUsers } from '~/main/features/users/action';
import { usersAction } from '~/main/features/users/slice';
import { useDispatchApp, useSelectorApp } from '~/redux/store';
import TopBar from './TopBar';
import { useColumns } from './common/columns';

const UsersUsersAdministratorScreen = () => {
  const { t } = useTranslation();

  const [searchParams] = useSearchParams();
  const searchValue = searchParams.get('q') || '';

  const dispatch = useDispatchApp();
  const {
    data: { rows: users = [], total },
    status,
    sort,
    pagination
  } = useSelectorApp((state) => state.users.users);

  const getData = useCallback(() => {
    dispatch(
      getUsers({
        sort,
        pagination,
        search: searchValue
      })
    );
  }, [dispatch, pagination, searchValue, sort]);

  useEffect(() => {
    getData();
  }, [getData]);

  const onSortModelChange = useCallback(
    (model: GridSortModel) => {
      dispatch(usersAction.setUsersSort(model));
    },
    [dispatch]
  );

  const onPaginationModelChange = useCallback(
    (model: GridPaginationModel) => {
      dispatch(usersAction.setUsersPagination(model));
    },
    [dispatch]
  );

  return (
    <LayoutWrapper title={t('app.title.allocation.items')} breadcrumbs={{ title: t('app.breadcrumb.allocation') }}>
      <View p='20px' flexGrow={1}>
        <Section flexGrow={1} gap={1}>
          <TopBar />
          <DataGrid
            name='users.users-administrator'
            rows={users}
            rowCount={total}
            columns={useColumns(t)}
            getRowId={(row) => row.companyNo}
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

export default UsersUsersAdministratorScreen;
