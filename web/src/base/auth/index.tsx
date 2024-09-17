import { AxiosResponse } from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Suspense, useCallback, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import AuthLoading from '~/base/auth/Loading';
import { AccountingSession } from '~/const/storage';
import i18n from '~/core/i18n';
import authActionApi from '~/main/features/auth/action';
import LoadingScreen from '~/main/screens/Loading';
import { commonAction } from '~/redux/common/slice';
import { useDispatchApp, useSelectorApp } from '~/redux/store';
import LayoutAuthBody from './Body';

type Props = {
  outlet?: React.ReactNode;
};

export default function LayoutAuth(props: Props) {
  const { outlet } = props;

  const { t } = useTranslation();

  const dispatch = useDispatchApp();
  const common = useSelectorApp((state) => state.common);
  const { language } = common;

  const navigation = useNavigate();
  const [searchParams] = useSearchParams();
  const [cookies, setCookie, removeCookie] = useCookies([AccountingSession]);

  const returnUrl = searchParams.get('return-url') || '/';

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    document.title = t('app.title');
  }, [t]);

  useEffect(() => {
    if (language) {
      i18n.changeLanguage(language);
    } else if (i18n.language) {
      dispatch(commonAction.setLanguage(i18n.language));
    }
  }, [dispatch, language]);

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
        navigation(returnUrl);
      }
    }

    setIsLoaded(true);
  }, [cookies, dispatch, navigation, returnUrl, setCookie]);

  useEffect(() => {
    const cookieSession = cookies[AccountingSession];
    if (!cookieSession || !cookieSession.accessToken || !cookieSession.refreshToken) {
      setIsLoaded(true);
      removeCookie(AccountingSession);
      return;
    }

    const currentDate = new Date();
    const decodedToken = jwtDecode(cookieSession.accessToken);

    if (decodedToken.exp && decodedToken.exp > currentDate.getTime() / 1000) {
      navigation(returnUrl);
      return;
    }

    onRefreshToken();
  }, [cookies, navigation, onRefreshToken, removeCookie, returnUrl]);

  if (!isLoaded) {
    return <LoadingScreen />;
  }

  return (
    <LayoutAuthBody>
      {outlet}
      <Suspense fallback={<AuthLoading />}>
        <Outlet />
      </Suspense>
    </LayoutAuthBody>
  );
}
