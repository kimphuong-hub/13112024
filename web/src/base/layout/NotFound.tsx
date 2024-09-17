import { Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Typography from '~/base/components/Material/Typography';
import View from '~/base/components/Material/View';
import Section from '~/base/components/Material/View/Section';
import LayoutWrapper from '~/base/layout/Wrapper';

const LayoutNotFound = () => {
  const { t } = useTranslation();

  return (
    <LayoutWrapper title={t('app.title.not-found')} breadcrumbs={{ title: t('app.breadcrumb.not-found') }}>
      <View p='20px' flexGrow={1}>
        <Section flexGrow={1} alignItems='center' justifyContent='center'>
          <View gap={2} style={{ width: '50%', padding: '25px 30px' }}>
            <View>
              <Typography style={{ fontSize: 40, fontWeight: 600 }}>{t('app.system.error.title')}</Typography>
              <Typography style={{ fontSize: 20 }}>{t('app.system.error.not-found')}</Typography>
            </View>
            <Divider />
            <Typography style={{ fontSize: 15, overflowWrap: 'anywhere' }}>
              {`${t('app.system.error.not-found')} ${t('app.system.error.try-again')}`}
            </Typography>
          </View>
        </Section>
      </View>
    </LayoutWrapper>
  );
};

export default LayoutNotFound;
