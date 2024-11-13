import { Grid, LinearProgress, Theme, useMediaQuery } from '@mui/material';
import { Suspense, lazy, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import DataGrid from '~/base/components/Material/DataGrid';
import View from '~/base/components/Material/View';
import Section from '~/base/components/Material/View/Section';
import LayoutWrapper from '~/base/layout/Wrapper';
import Typography from '~/base/components/Material/Typography';
import toast from 'react-hot-toast';
import { FormAction } from './components/FormAction';
import TopBar from './TopBar';
import { useColumns } from './common/columns';

const sampleUsers = [
  { id: '1', name: 'hugo', description: 'abcdyz' },
  { id: '2', name: 'joni', description: 'xyzabc' },
  { id: '3', name: 'choni', description: 'xcbazy' }
];

const UserList = lazy(() => import('./components/UserList'));

const UsersRolesScreen = () => {
  const { t } = useTranslation();
  const isMd = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
  const { innerHeight: height } = window;

  const [searchParams] = useSearchParams();
  const searchValue = searchParams.get('search') || '';
  const [users] = useState(sampleUsers);
  const [selected] = useState<string | null>(null);

  const usersRows = useMemo(() => {
    const search = searchValue.toLowerCase();

    return users.filter((user) => {
      const name = user.name.toLowerCase();
      const description = user.description.toLowerCase();

      const searchCondition = name.includes(search) || description.includes(search);

      return searchCondition;
    });
  }, [users, searchValue]);


  const onSaveSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      
      console.log('Selected:', selected);
      console.log('Translation function t:', t); 
      if (selected) {
        toast.success(t('app.system.saved.success')); 
      } else {
        toast.error(t('app.system.saved.no-changed')); 
      }
    },
    [selected, t] 
  );
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
                rows={usersRows}
                columns={useColumns(t)}
                getRowId={(row) => row.id}
                loading={false}
              />
              {selected && (
                <Typography variant='h6' mt={2}>
                  Selected ID: {selected}
                </Typography>
              )}
            </Section>
          </Grid>
          <Grid item display='flex' xs={12} md={6} lg={5} xl={4}>
            <Section>
              <Suspense fallback={<LinearProgress />}>
                <UserList/>
              </Suspense>
            </Section>
          </Grid>
        </Grid>
      </View>
    </LayoutWrapper>
  );
};

export default UsersRolesScreen;
