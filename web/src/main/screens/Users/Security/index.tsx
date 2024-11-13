
import { Grid, LinearProgress, Theme, useMediaQuery } from '@mui/material';
import { Suspense, lazy, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DataGrid from '~/base/components/Material/DataGrid';
import View from '~/base/components/Material/View';
import Section from '~/base/components/Material/View/Section';
import LayoutWrapper from '~/base/layout/Wrapper';
import toast from 'react-hot-toast';
import { FormAction } from './components/FormAction';
import TopBar from './TopBar';
import { useColumns } from './common/columns';

const UserList = lazy(() => import('./components/UserList'));

const UsersRolesScreen = () => {
  const { t } = useTranslation();
  const isMd = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
  const { innerHeight: height } = window;
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(true);

  const fetchUsers = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:3001/SecurityRole'); 
      const data = await response.json();
      console.log('Fetched users:', data);
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu:', error);
      setLoading(false);
      toast.error(t('app.system.load.failed'));
    }
  }, [t]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const onSaveSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      console.log('Selected User:', selectedUser);
      if (selectedUser) {
        toast.success(t('app.system.saved.success'));
      } else {
        toast.error(t('app.system.saved.no-changed'));
      }
    },
    [selectedUser, t]
  );
  const onRowClick = useCallback((params) => {
    const selectedRow = users.find((user) => user.Id === params.id);
    if (selectedRow) {
      setSelectedUser(selectedRow);
      console.log('Selected user:', selectedRow);
    }
  }, [users, setSelectedUser]);

  return (
    <LayoutWrapper
      title={t('app.breadcrumb.users')}
      breadcrumbs={{
        title: t('app.menu.users'),
        rightComponent: <FormAction onSave={onSaveSubmit} />
      }}
    >
      <View id='drawer-container' position='relative' p='20px' flexDirection='row' flexGrow={1}>
        <Grid container spacing={2}>
          <Grid item display='flex' xs={12} md={6} lg={7} xl={8}>
            <Section flexGrow={1} gap={1} className='custom-scrollbar' {...(!isMd && { height: height / 1.5 })}>
              <TopBar />
              <DataGrid
                name='app.menu.users.roles'
                columns={useColumns(t)}
                getRowId={(row) => row.Id}
                loading={loading}
                rows={users}
                onRowClick={onRowClick} 
              />
            </Section>
          </Grid>
          <Grid item display='flex' xs={12} md={6} lg={5} xl={4}>
            <Section>
              <Suspense fallback={<LinearProgress />}>
                <UserList selectedUser={selectedUser} />
              </Suspense>
            </Section>
          </Grid>
        </Grid>
      </View>
    </LayoutWrapper>
  );
};

export default UsersRolesScreen;
