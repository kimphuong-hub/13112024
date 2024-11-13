import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DataGrid from '~/base/components/Material/DataGrid';
import View from '~/base/components/Material/View';
import Section from '~/base/components/Material/View/Section';
import LayoutWrapper from '~/base/layout/Wrapper';
import TopBar from './TopBar';
import { useColumns } from './common/columns';
import { useSearchParams } from 'react-router-dom';
import { fetchGroupAccounts } from '../../../../features/users/action';
import { useDispatch } from 'react-redux';
const UsersScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchParams] = useSearchParams();
  const searchValue = searchParams.get('q') || '';

  const getData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchGroupAccounts();
      const filteredData = data.filter((groups: { displayname: string; }) => 
        groups.displayname.toLowerCase().includes(searchValue.toLowerCase())
      );
      setGroups(filteredData); 
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
      title={t('app.title.account-settings.group-accounts')}
      breadcrumbs={{ title: t('app.breadcrumb.account-settings') }}
    >
      <View p='20px' flexGrow={1}>
        <Section flexGrow={1} gap={1}>
          <TopBar />
          <DataGrid
            name='account-settings.group-accounts'
            rows={groups} 
            columns={useColumns(t)}
            getRowId={(row) => row.id}

          />
        </Section>
      </View>
    </LayoutWrapper>
  );
};

export default UsersScreen;
