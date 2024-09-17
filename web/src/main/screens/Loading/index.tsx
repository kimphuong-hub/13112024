import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDebouncedCallback } from 'use-debounce';
import Typography from '~/base/components/Material/Typography';
import Section from '~/base/components/Material/View/Section';
import FontAwesomeIcon from '~/base/components/Icon/FontAwesome';
import View from '~/base/components/Material/View';

const LoadingScreen = () => {
  const { t } = useTranslation();

  const [error, setError] = useState(false);

  const onReload = useDebouncedCallback(() => {
    window.location.reload();
  }, 10000);

  const onError = useDebouncedCallback(() => {
    setError(true);
    onReload();
  }, 10000);

  useEffect(() => {
    onError();
  }, [onError]);

  return (
    <Section height='100vh' justifyContent='center' alignItems='center' gap={5}>
      <img src='/images/cisbox_logo.svg' alt='cisbox Accounting' style={{ width: '220px', height: '88px' }} />
      <View justifyContent='center' alignItems='center' gap={3}>
        {error ? <FontAwesomeIcon icon='fa-solid fa-bug' size={40} /> : <CircularProgress />}
        {error && <Typography fontSize={16}>{t('app.system.error.message')}</Typography>}
      </View>
    </Section>
  );
};

export default LoadingScreen;
