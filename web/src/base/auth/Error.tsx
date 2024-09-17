import * as Sentry from '@sentry/react';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouteError, useSearchParams } from 'react-router-dom';
import Typography from '~/base/components/Material/Typography';
import { FAILURE_IMPORTED_MODULE } from '~/const/errors';
import View from '../components/Material/View';

const LayoutAuthError = () => {
  const _error = useRouteError();
  const { t } = useTranslation();

  const error = _error as { message?: string; statusText?: string };
  const message = `${error?.statusText || error?.message}`;

  const [searchParams, setSearchParams] = useSearchParams();
  const refreshTimes = Number(searchParams.get('refresh')) || 0;

  useEffect(() => {
    if (message.includes(FAILURE_IMPORTED_MODULE)) {
      if (refreshTimes <= 1) {
        searchParams.set('refresh', `${refreshTimes + 1}`);
        setSearchParams(searchParams, { replace: true });

        window.location.reload();
      }
      return;
    }

    Sentry.captureException(error);
  }, [error, message, refreshTimes, searchParams, setSearchParams, t]);

  const errorMessage = useMemo(() => {
    let errorMessage = `${message || t('app.system.error.message')}.`;

    if (message.includes(FAILURE_IMPORTED_MODULE)) {
      errorMessage = `${t('app.system.error.imported-module')}`;
    }

    return errorMessage;
  }, [message, t]);

  return (
    <View width='70%' gap={1}>
      <Typography color='black' style={{ fontSize: 30, fontWeight: 600 }}>
        {t('app.system.error.title')}
      </Typography>
      <Typography color='black' style={{ fontSize: 15, overflowWrap: 'anywhere' }}>
        {errorMessage}
      </Typography>
    </View>
  );
};

export default LayoutAuthError;
