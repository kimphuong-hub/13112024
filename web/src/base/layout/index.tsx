import { Theme, ThemeProvider, useMediaQuery } from '@mui/material';
import { AxiosResponse, HttpStatusCode } from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';
import { AccountingSession } from '~/const/storage';
import { axiosRequest } from '~/core/api';
import { isDev } from '~/core/config';
import i18n from '~/core/i18n';
import { accountingDarkTheme, accountingTheme } from '~/core/theme';
import authActionApi from '~/main/features/auth/action';
import { authAction } from '~/main/features/auth/slice';
import LoadingScreen from '~/main/screens/Loading';
import { getCommonConfiguration } from '~/redux/common/action';
import { useDispatchApp, useSelectorApp } from '~/redux/store';
import View from '../components/Material/View';
import LayoutBody from './Body';
import LayoutDrawer from './Drawer';
import LayoutLoading from './Loading';
import LayoutMenu from './Menu';
import LayoutNavbar from './Navbar';
import LayoutToolbar from './Toolbar';
import LayoutVersion from './Version';

type Props = {
  outlet?: React.ReactNode;
};

export default function Layout(props: Props) {
  const { outlet } = props;

  const isMd = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  const location = useLocation();
  const navigation = useNavigate();
  const [cookies, setCookie, removeCookies] = useCookies([AccountingSession]);

  const currentUrl = encodeURIComponent(`${location.pathname}${location.search}`);

  const dispatch = useDispatchApp();

  const common = useSelectorApp((state) => state.common);

  const { theme, language } = common;

  const [isLoaded, setIsLoaded] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(0);
  const [openDrawerByUser, setOpenDrawerByUser] = useState(false);

  // Drawer
  useEffect(() => {
    if (openDrawerByUser) {
      return;
    }

    if (isMd) {
      setOpenDrawer(2);
      return;
    }

    setOpenDrawer(0);
  }, [isMd, openDrawerByUser]);

  const onClickBars = useCallback(() => {
    if (isMd) {
      setOpenDrawer((prev) => (prev === 1 ? 2 : 1));
    } else {
      setOpenDrawer((prev) => (prev > 1 ? 0 : prev + 1));
    }
    setOpenDrawerByUser(true);
  }, [isMd]);

  // End Drawer

  // User Configuration

  const onLoadLanguage = useDebouncedCallback(() => {
    if (language) {
      i18n.changeLanguage(language);
    }
  }, 100);

  useEffect(() => {
    onLoadLanguage();
  }, [language, onLoadLanguage]);

  const onLoadConfiguration = useCallback(async () => {
    if (!isLoaded) {
      dispatch(getCommonConfiguration());
      setIsLoaded(true);
    }
  }, [dispatch, isLoaded]);

  // End User Configuration

  // Session Token

  const onLogout = useCallback(() => {
    axiosRequest.interceptors.request.clear();
    axiosRequest.interceptors.response.clear();

    removeCookies(AccountingSession, { path: '/' });
    navigation(`/auth/login?return-url=${currentUrl}`);
  }, [currentUrl, navigation, removeCookies]);

  const onRefreshToken = useCallback(async () => {
    const cookieSession = cookies[AccountingSession];
    const { refreshToken } = cookieSession;

    const currentDate = new Date();
    const decodedToken = jwtDecode(refreshToken);

    if (decodedToken.exp && decodedToken.exp > currentDate.getTime() / 1000) {
      const dispatchAction = await dispatch(authActionApi.refreshToken({ refreshToken }));
      if (dispatchAction.payload) {
        const { access_token: accessToken } = (dispatchAction.payload as AxiosResponse).data;
        setCookie(AccountingSession, { accessToken, refreshToken }, { path: '/' });
        return accessToken;
      }
    }

    onLogout();
  }, [cookies, dispatch, onLogout, setCookie]);

  useEffect(() => {
    const cookieSession = cookies[AccountingSession];
    if (!cookieSession || !cookieSession.accessToken || !cookieSession.refreshToken) {
      onLogout();
      return;
    }

    const currentDate = new Date();
    const decodedToken = jwtDecode(cookieSession.accessToken);

    if (decodedToken.exp && decodedToken.exp > currentDate.getTime() / 1000) {
      dispatch(authAction.setAuth(cookieSession));
      dispatch(authAction.setProfile(decodedToken.sub));
      return;
    }

    onRefreshToken();
  }, [cookies, dispatch, onLogout, onRefreshToken]);

  useEffect(() => {
    const cookieSession = cookies[AccountingSession];
    if (!cookieSession || !cookieSession.accessToken || !cookieSession.refreshToken) {
      return;
    }

    axiosRequest.interceptors.request.clear();
    axiosRequest.interceptors.response.clear();

    axiosRequest.interceptors.request.use(async (config) => {
      // Log for dev
      if (isDev) {
        console.log('REQUEST: ', config.url);
      }

      const authorization = config.headers.Authorization;
      if (!authorization) {
        const currentDate = new Date();

        const { accessToken } = cookieSession;
        const decodedToken = jwtDecode(accessToken);

        config.headers.Authorization = `Bearer ${accessToken}`;

        if (decodedToken.exp && decodedToken.exp < currentDate.getTime() / 1000) {
          const accessToken = await onRefreshToken();
          config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
      }

      return config;
    });

    axiosRequest.interceptors.response.use(null, (error) => {
      if ([HttpStatusCode.Unauthorized, HttpStatusCode.UnprocessableEntity].includes(error.response.status)) {
        onLogout();
      }

      return Promise.reject(error);
    });

    onLoadConfiguration();
  }, [cookies, onLoadConfiguration, onLogout, onRefreshToken]);

  // End Session Token

  const themeStore = useMemo(() => {
    if (theme === 'light') {
      return accountingTheme;
    }
    return accountingDarkTheme;
  }, [theme]);

  if (!theme || !language || !isLoaded || !cookies[AccountingSession]) {
    return <LoadingScreen />;
  }

  return (
    <ThemeProvider theme={themeStore}>
      <View flexDirection='row'>
        <LayoutNavbar position='absolute' onClickBars={onClickBars} />
        {openDrawer > 0 && (
          <LayoutDrawer variant='permanent' open={openDrawer === 2}>
            <LayoutToolbar />
            <LayoutMenu openDrawer={openDrawer === 2} />
            <LayoutVersion openDrawer={openDrawer === 2} />
          </LayoutDrawer>
        )}
        {openDrawer === 0 && <View height='100vh' />}
        <LayoutBody>
          {outlet}
          <Suspense fallback={<LayoutLoading />}>
            <Outlet />
          </Suspense>
        </LayoutBody>
      </View>
    </ThemeProvider>
  );
}
