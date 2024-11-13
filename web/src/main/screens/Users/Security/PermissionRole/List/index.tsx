import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DataGrid from '~/base/components/Material/DataGrid';
import View from '~/base/components/Material/View';
import Section from '~/base/components/Material/View/Section';
import LayoutWrapper from '~/base/layout/Wrapper';
import TopBar from './TopBar';
import { useColumns } from './common/columns';
import toast from 'react-hot-toast';
import { useSearchParams } from 'react-router-dom';


const PermissionRoleScreen = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(true);
  const fetchUsers = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:3001/PermissionRole'); 
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


  const [searchParams] = useSearchParams();
  const searchValue = searchParams.get('q') || '';

  return (
    <LayoutWrapper
      title={t('app.title.allocation.archives')}
      breadcrumbs={{
        title: t('app.breadcrumb.allocation')
      }}
    >
      <View p='20px' flexGrow={1}>
        <Section flexGrow={1} gap={1}>
          <TopBar />
          <DataGrid
            name='allocation.archives'
            rows={users}
            columns={useColumns(t)}
            getRowId={(row) => row.Id}
            loading={ loading}
          />
        </Section>
      </View>
    </LayoutWrapper>
  );
};

export default PermissionRoleScreen;
