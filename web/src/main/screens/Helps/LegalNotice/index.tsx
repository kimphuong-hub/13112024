import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import FontAwesomeIcon from '~/base/components/Icon/FontAwesome';
import Button from '~/base/components/Material/Button';
import View from '~/base/components/Material/View';
import Section from '~/base/components/Material/View/Section';
import LayoutWrapper from '~/base/layout/Wrapper';

const HelpsLegalNoticeScreen = () => {
  const { t } = useTranslation();

  return (
    <LayoutWrapper
      title={t('app.title.helps.legal-notice')}
      breadcrumbs={{ title: t('app.breadcrumb.helps.legal-notice') }}
    >
      <View p='20px' flexGrow={1}>
        <Section>
          <Box>
            <a href='https://www.cisbox.com/en/legal-notice/' target='_blank' rel='noreferrer'>
              <Button variant='text'>
                Reference
                <FontAwesomeIcon icon='fa-solid fa-link' color='' size={12} sx={{ ml: 0.5 }} />
              </Button>
            </a>
          </Box>
        </Section>
      </View>
    </LayoutWrapper>
  );
};

export default HelpsLegalNoticeScreen;
