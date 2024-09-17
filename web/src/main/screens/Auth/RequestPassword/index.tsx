import { AxiosResponse, HttpStatusCode } from 'axios';
import { FormikHelpers, useFormik } from 'formik';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import LayoutAuthButton from '~/base/auth/Button';
import LayoutAuthTextField from '~/base/auth/TextField';
import Form from '~/base/components/Form';
import { TypographySecondary } from '~/base/components/Material/Typography';
import View from '~/base/components/Material/View';
import NavLink from '~/base/components/Router/NavLink';
import authActionApi from '~/main/features/auth/action';
import { useDispatchApp } from '~/redux/store';
import { FormValues, initialValues, validationSchema } from './common/form';
import { CircularProgress } from '@mui/material';

const AuthRequestPasswordScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatchApp();

  const navigation = useNavigate();

  const [loading, setLoading] = useState(false);
  const [textSuccess, setTextSuccess] = useState('');
  const [textFailure, setTextFailure] = useState('');

  const onSubmit = useCallback(
    (values: FormValues, formik: FormikHelpers<FormValues>) => {
      if (loading) {
        return;
      }

      setLoading(true);

      setTextFailure('');
      setTextSuccess('');

      toast
        .promise(
          dispatch(authActionApi.requestNewPassword(values))
            .then((response) => {
              const payload = response.payload as AxiosResponse;
              if (!payload) {
                throw new Error(t('app.system.error.disconnect'));
              }

              if (payload.data && payload.data.status === HttpStatusCode.BadRequest) {
                setTextFailure(t('app.auth.request-password.failure.not-found'));
                throw new Error(t('app.auth.request-password.failure.not-found'));
              }

              setTextSuccess(t('app.auth.request-password.success'));
            })
            .finally(() => setLoading(false)),
          {
            loading: t('app.system.loading.processing'),
            success: t('app.auth.request-password.success'),
            error: (error) => `${error.message || error || t('app.system.error.message')}`
          }
        )
        .then(() => formik.resetForm());
    },
    [dispatch, loading, t]
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
            placeholder={t('app.input.email.placeholder')}
          />
          <TypographySecondary>{t('app.auth.request-password.description')}</TypographySecondary>
          {textSuccess && <TypographySecondary color='blue'>{textSuccess}</TypographySecondary>}
          {textFailure && <TypographySecondary color='red'>{textFailure}</TypographySecondary>}
        </View>
        {textSuccess && (
          <LayoutAuthButton onClick={() => navigation('/auth/login')}>
            {t('app.auth.request-password.button.login')}
          </LayoutAuthButton>
        )}
        {!textSuccess && (
          <LayoutAuthButton type='submit'>
            {loading && <CircularProgress size={12.5} sx={{ mr: 1 }} />}
            {t('app.auth.request-password.button')}
          </LayoutAuthButton>
        )}
        <View alignItems='center'>
          <NavLink to='/auth/login' style={{ fontSize: 13, fontWeight: 400 }}>
            {t('app.auth.request-password.login')}
          </NavLink>
        </View>
      </View>
    </Form>
  );
};

export default AuthRequestPasswordScreen;
