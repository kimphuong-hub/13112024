import { AxiosResponse, HttpStatusCode } from 'axios';
import { FormikHelpers, useFormik } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import LayoutAuthButton from '~/base/auth/Button';
import LayoutAuthTextField from '~/base/auth/TextField';
import Form from '~/base/components/Form';
import { Alert } from '~/base/components/Material/Alert';
import { TypographySecondary } from '~/base/components/Material/Typography';
import View from '~/base/components/Material/View';
import authActionApi from '~/main/features/auth/action';
import { useDispatchApp } from '~/redux/store';
import { FormValues, initialValues, validationSchema } from './common/form';
import { CircularProgress } from '@mui/material';

const ConditionView = ({ test }: { test: boolean }) =>
  test ? <View color='green'>✔</View> : <View color='red'>✖</View>;

const AuthResetPasswordScreen = () => {
  const { t } = useTranslation();
  const { search } = useLocation();

  const dispatch = useDispatchApp();

  const navigation = useNavigate();

  const [email, setEmail] = useState('');
  const [resetPasswordToken, setResetPasswordToken] = useState('');

  const [loading, setLoading] = useState(false);
  const [textSuccess, setTextSuccess] = useState('');
  const [textFailure, setTextFailure] = useState('');

  useEffect(() => {
    const query = new URLSearchParams(search);
    setEmail(query.get('email') || '');
    setResetPasswordToken(query.get('token') || '');
  }, [search]);

  const onSubmit = useCallback(
    (values: FormValues, formik: FormikHelpers<FormValues>) => {
      if (loading) {
        return;
      }

      setLoading(true);

      toast
        .promise(
          dispatch(
            authActionApi.resetPassword({
              email,
              password: values.newPassword,
              resetPasswordToken
            })
          )
            .then((response) => {
              const payload = response.payload as AxiosResponse;
              if (!payload) {
                throw new Error(t('app.system.error.disconnect'));
              }

              if (payload.data && payload.data.status === HttpStatusCode.BadRequest) {
                setTextFailure(t('app.auth.reset-password.failure.expired'));
                throw new Error(t('app.auth.reset-password.failure.expired'));
              }

              setTextSuccess(t('app.auth.reset-password.success'));
            })
            .finally(() => setLoading(false)),
          {
            loading: t('app.system.loading.processing'),
            success: t('app.auth.reset-password.success'),
            error: (error) => `${error.message || error || t('app.system.error.message')}`
          }
        )
        .then(() => formik.resetForm());
    },
    [dispatch, email, loading, resetPasswordToken, t]
  );

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema(t),
    onSubmit
  });

  if (!resetPasswordToken) {
    return;
  }

  return (
    <Form onSubmit={formik.submitForm}>
      <View style={{ width: '230px' }} gap={2.5}>
        {!textSuccess && !textFailure && (
          <View gap={1.5}>
            <TypographySecondary>{t('app.auth.reset-password.description')}</TypographySecondary>
            <LayoutAuthTextField
              icon='fa-solid fa-lock-alt'
              type='password'
              name='newPassword'
              value={formik.values.newPassword}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
              helperText={formik.touched.newPassword && formik.errors.newPassword}
              placeholder={t('app.input.newPassword.placeholder')}
            />
            <LayoutAuthTextField
              icon='fa-solid fa-lock-alt'
              type='password'
              name='reNewPassword'
              value={formik.values.reNewPassword}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={formik.touched.reNewPassword && Boolean(formik.errors.reNewPassword)}
              helperText={formik.touched.reNewPassword && formik.errors.reNewPassword}
              placeholder={t('app.input.newPasswordRepetition.placeholder')}
            />
            <Alert icon={false} variant='filled' severity='info'>
              <View p='0px 10px' gap={1}>
                <View>{t('app.password.condition.title')}</View>
                <View>
                  <View flexDirection='row' gap={1}>
                    {t('app.password.condition.1')}
                    <ConditionView test={formik.values.newPassword.length >= 10} />
                  </View>
                  <View flexDirection='row' gap={1}>
                    {t('app.password.condition.2')}
                    <ConditionView test={/[\d]/.test(formik.values.newPassword)} />
                  </View>
                  <View flexDirection='row' gap={1}>
                    {t('app.password.condition.3')}
                    <ConditionView test={/[A-Z]/.test(formik.values.newPassword)} />
                  </View>
                  <View flexDirection='row' gap={1}>
                    {t('app.password.condition.4')}
                    <ConditionView test={/[a-z]/.test(formik.values.newPassword)} />
                  </View>
                  <View flexDirection='row' gap={1}>
                    {t('app.password.condition.5')}
                    <ConditionView test={/[^\w\s]/.test(formik.values.newPassword)} />
                  </View>
                </View>
              </View>
            </Alert>
          </View>
        )}
        {textSuccess && <TypographySecondary>{textSuccess}</TypographySecondary>}
        {textFailure && <TypographySecondary color='red'>{textFailure}</TypographySecondary>}
        {(textSuccess || textFailure) && (
          <LayoutAuthButton onClick={() => navigation('/auth/login')}>
            {t('app.auth.reset-password.button.login')}
          </LayoutAuthButton>
        )}
        {!textSuccess && !textFailure && (
          <LayoutAuthButton type='submit'>
            {loading && <CircularProgress size={12.5} sx={{ mr: 1 }} />}
            {t('app.auth.reset-password.button')}
          </LayoutAuthButton>
        )}
      </View>
    </Form>
  );
};

export default AuthResetPasswordScreen;
