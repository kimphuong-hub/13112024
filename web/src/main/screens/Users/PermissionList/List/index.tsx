import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import DataGrid from '~/base/components/Material/DataGrid';
import View from '~/base/components/Material/View';
import Section from '~/base/components/Material/View/Section';
import LayoutWrapper from '~/base/layout/Wrapper';
import { useDispatchApp, useSelectorApp } from '~/redux/store';
import TopBar from './TopBar';
import { useColumns } from './common/columns';
import { FormAction } from './components/FormAction';
import { getPermission } from '~/main/features/users/action';

const PermissionListScreen = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const searchValue = searchParams.get('q') || '';
  const [permission, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatchApp();

  const [openFilter, setOpenFilter] = useState(false); 

  const getData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getPermission();
      const filteredData = data.filter((permission: { permission1: string; }) => 
        permission.permission1.toLowerCase().includes(searchValue.toLowerCase())
      );
      setPermissions(filteredData); 
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false); 
    }
  }, [searchValue]);

  useEffect(() => {
    getData();
  }, [getData]);
  return (
    <LayoutWrapper
      title={t('app.title.allocation.archives')}
      breadcrumbs={{
        title: t('app.breadcrumb.allocation'),
        rightComponent: <FormAction onToggleFilter={() => setOpenFilter(!openFilter)} />,
      }}
    >
      <View p="20px" flexGrow={1}>
        <Section flexGrow={1} gap={1}>
          <TopBar />
          <DataGrid
            name="allocation.archives"
            rows={permission}
            columns={useColumns(t)}
            loading={status === 'loading'}
          />
        </Section>
      </View>
    </LayoutWrapper>
  );
};

export default PermissionListScreen;
