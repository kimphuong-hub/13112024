import { ThemeProvider } from '@mui/material/styles';
import * as Sentry from '@sentry/react';
import { Suspense, lazy } from 'react';
import { Toaster } from 'react-hot-toast';
import { appSentryDsn, isDev } from '~/core/config';
import LoadingScreen from '~/main/screens/Loading';
import { accountingTheme } from './src/core/theme';

if (!isDev) {
  Sentry.init({
    dsn: appSentryDsn,
    environment: 'production',
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.browserProfilingIntegration(),
      Sentry.replayIntegration()
    ],
    tracesSampleRate: 1.0,
    tracePropagationTargets: ['localhost', /^https:\/\/cisbox\.com/],
    profilesSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0
  });
}

const RouterProvider = lazy(() => import('./Router'));

export default function App() {
  return (
    <ThemeProvider theme={accountingTheme}>
      <Toaster position='top-right' />
      <Suspense fallback={<LoadingScreen />}>
        <RouterProvider />
      </Suspense>
    </ThemeProvider>
  );
}
