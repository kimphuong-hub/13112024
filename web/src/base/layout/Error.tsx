import { Divider } from '@mui/material';
import * as Sentry from '@sentry/react';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouteError, useSearchParams } from 'react-router-dom';
import Typography from '~/base/components/Material/Typography';
import View from '~/base/components/Material/View';
import Section from '~/base/components/Material/View/Section';
import LayoutWrapper from '~/base/layout/Wrapper';
import { FAILURE_IMPORTED_MODULE } from '~/const/errors';
import { useSelectorApp } from '~/redux/store';

const LayoutError = () => {
  const _error = useRouteError();
  const { t } = useTranslation();

  const error = _error as { message?: string; statusText?: string };
  const message = `${error?.statusText || error?.message}`;

  const [searchParams, setSearchParams] = useSearchParams();
  const refreshTimes = Number(searchParams.get('refresh')) || 0;

  const profile = useSelectorApp((state) => state.auth.data.profile);

  useEffect(() => {
    if (message.includes(FAILURE_IMPORTED_MODULE)) {
      if (refreshTimes <= 1) {
        searchParams.set('refresh', `${refreshTimes + 1}`);
        setSearchParams(searchParams, { replace: true });

        window.location.reload();
      }
      return;
    }

    Sentry.getCurrentScope().setUser(profile);
    Sentry.captureException(error);
  }, [error, message, profile, refreshTimes, searchParams, setSearchParams, t]);

  const errorMessage = useMemo(() => {
    let errorMessage = `${message || t('app.system.error.message')}.`;

    if (message.includes(FAILURE_IMPORTED_MODULE)) {
      errorMessage = `${t('app.system.error.imported-module')}`;
    }

    return errorMessage;
  }, [message, t]);

  return (
    <LayoutWrapper title={t('app.title.error')} breadcrumbs={{ shown: false }}>
      <View p='20px' flexGrow={1}>
        <Section flexGrow={1} alignItems='center' justifyContent='center'>
          <View gap={2} style={{ width: '50%', padding: '25px 30px' }}>
            <View>
              <Typography style={{ fontSize: 40, fontWeight: 600 }}>{t('app.system.error.title')}</Typography>
              <Typography style={{ fontSize: 20 }}>{t('app.system.error.unexpected')}</Typography>
            </View>
            <Divider />
            <Typography style={{ fontSize: 15, overflowWrap: 'anywhere' }}>{errorMessage}</Typography>
          </View>
        </Section>
      </View>
    </LayoutWrapper>
  );
};

export default LayoutError;
