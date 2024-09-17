import { Grid } from '@mui/material';
import Typography from '~/base/components/Material/Typography';
import View from '~/base/components/Material/View';
import Section from '~/base/components/Material/View/Section';
import LayoutWrapper from '~/base/layout/Wrapper';
import TabInvoicesItemsOverview from './components/Tabs/InvoicesItemsOverview';
import TabInvoicesOverview from './components/Tabs/InvoicesOverview';
import TabItemsTrend from './components/Tabs/ItemsTrend';
import { TabNotification } from './components/Tabs/Notification';
import { TabUsers } from './components/Tabs/Users';
import { useTranslation } from 'react-i18next';

const HomeScreen = () => {
  const { t } = useTranslation();

  // const [openFilter, setOpenFilter] = useState(false);

  return (
    <LayoutWrapper
    // breadcrumbs={{
    //   rightComponent: <FormAction onToggleFilter={() => setOpenFilter(!openFilter)} />,
    //   bottomComponent: <FormFilter open={openFilter} onClose={() => setOpenFilter(false)} />
    // }}
    >
      <View p='20px' flexGrow={1}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={4} xl={3} display='flex'>
            <Section flexGrow={1} gap={0}>
              <TabInvoicesItemsOverview />
            </Section>
          </Grid>
          <Grid item xs={12} md={12} lg={8} xl={9}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} lg={6} xl={8} display='flex' order={{ xs: 0 }}>
                <Section flexGrow={1} gap={0}>
                  <TabInvoicesOverview />
                </Section>
              </Grid>
              <Grid item xs={12} md={6} lg={6} xl={4} display='flex' order={{ xs: 2 }}>
                <Section flexGrow={1} minHeight={300} gap={0}>
                  <Typography fontWeight={700} mb={1}>
                    {t('app.home.users.title')}
                  </Typography>
                  <TabUsers />
                </Section>
              </Grid>
              <Grid item xs={12} md={6} lg={6} xl={4} display='flex' order={{ xs: 3 }}>
                <Section flexGrow={1} minHeight={300} gap={0}>
                  <TabNotification />
                </Section>
              </Grid>
              <Grid item xs={12} md={12} lg={12} xl={8} display='flex' order={{ xs: 4 }}>
                <Section flexGrow={1} gap={0}>
                  <Typography fontWeight={700} mb={1}>
                    {t('app.home.items-trend.title')}
                  </Typography>
                  <TabItemsTrend />
                </Section>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </View>
    </LayoutWrapper>
  );
};

export default HomeScreen;
