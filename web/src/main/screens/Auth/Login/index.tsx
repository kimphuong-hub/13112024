import { AxiosResponse, HttpStatusCode } from 'axios';
import { useFormik } from 'formik';
import { useCallback, useState } from 'react';
import { useCookies } from 'react-cookie';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import LayoutAuthButton from '~/base/auth/Button';
import LayoutAuthTextField from '~/base/auth/TextField';
import Form from '~/base/components/Form';
import View from '~/base/components/Material/View';
import NavLink from '~/base/components/Router/NavLink';
import { AccountingSession } from '~/const/storage';
import authActionApi from '~/main/features/auth/action';
import { useDispatchApp } from '~/redux/store';
import { FormValues, initialValues, validationSchema } from './common/form';
import { CircularProgress } from '@mui/material';

const AuthLoginScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatchApp();

  const navigation = useNavigate();
  const [searchParams] = useSearchParams();
  const [, setCookie] = useCookies([AccountingSession]);

  const [loading, setLoading] = useState(false);

  const returnUrl = searchParams.get('return-url') || '/';

  const onSubmit = useCallback(
    (values: FormValues) => {
      if (loading) {
        return;
      }

      setLoading(true);

      toast.promise(
        dispatch(authActionApi.login(values))
          .then((response) => {
            const payload = response.payload as AxiosResponse;
            if (!payload) {
              throw new Error(t('app.system.error.disconnect'));
            }

            if (payload.status === HttpStatusCode.BadRequest) {
              if (payload.data.includes('Network connection issues')) {
                throw new Error(t('app.system.error.disconnect'));
              }
              if (payload.data.includes('The user name or password is incorrect')) {
                throw new Error(t('app.auth.login.failure'));
              }
              throw new Error(t('app.system.error.internal-server'));
            }

            const { access_token: accessToken, refresh_token: refreshToken } = payload.data;
            setCookie(AccountingSession, { accessToken, refreshToken }, { path: '/' });
            navigation(returnUrl);
          })
          .finally(() => setLoading(false)),
        {
          loading: t('app.auth.login.processing'),
          success: t('app.auth.login.success'),
          error: (error) => `${error.message || error || t('app.system.error.message')}`
        }
      );
    },
    [dispatch, loading, navigation, returnUrl, setCookie, t]
  );

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema(t),
    onSubmit
  });

  return (
    <Form onSubmit={formik.submitForm}>
      <View style={{ width: '230px' }} gap={2.5}>
        <View gap={1.5}>
          <LayoutAuthTextField
            icon='fa-solid fa-user'
            type='email'
            name='email'
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            placeholder={t('app.profile.master-data.input.email.placeholder')}
          />
          <LayoutAuthTextField
            icon='fa-solid fa-lock-alt'
            type='password'
            name='password'
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            placeholder={t('app.profile.master-data.input.password.placeholder')}
          />
        </View>
        <LayoutAuthButton type='submit'>
          {loading && <CircularProgress size={12.5} sx={{ mr: 1 }} />}
          {t('app.auth.login.button')}
        </LayoutAuthButton>
        <View alignItems='center'>
          <NavLink to='/auth/request-password' style={{ fontSize: 13, fontWeight: 400 }}>
            {t('app.auth.login.forgot-password')}
          </NavLink>
        </View>
      </View>
    </Form>
  );
};

export default AuthLoginScreen;
