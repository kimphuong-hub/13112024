import { Grid } from '@mui/material';
import { AxiosResponse } from 'axios';
import { FormikHelpers, useFormik } from 'formik';
import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { Alert } from '~/base/components/Material/Alert';
import BoxInput from '~/base/components/Material/Box/Input';
import Label from '~/base/components/Material/Form/Label';
import TextField from '~/base/components/Material/Form/TextField';
import View from '~/base/components/Material/View';
import Section from '~/base/components/Material/View/Section';
import LayoutWrapper from '~/base/layout/Wrapper';
import authActionApi from '~/main/features/auth/action';
import { useDispatchApp, useSelectorApp } from '~/redux/store';
import { FormAction } from './components/FormAction';
import { FormValues, initialValues, validationSchema } from './common/form';

const ConditionView = ({ test }: { test: boolean }) =>
  test ? <View color='green'>✔</View> : <View color='red'>✖</View>;

const ProfileChangePasswordScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatchApp();

  const profile = useSelectorApp((state) => state.auth.data.profile);

  const onSubmit = useCallback(
    (values: FormValues, formik: FormikHelpers<FormValues>) => {
      toast
        .promise(
          dispatch(authActionApi.changePassword(values)).then((response) => {
            const payload = response.payload as AxiosResponse;
            const { result } = payload.data;
            if (result === 'Fail') {
              formik.setFieldValue('previousPassword', '');
              throw new Error('Your previous password not correct');
            }
          }),
          {
            loading: 'Loading...',
            success: 'Change password success!',
            error: (error) => `${error.message || error}`
          }
        )
        .then(() => formik.resetForm());
    },
    [dispatch]
  );

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema(t),
    onSubmit
  });

  return (
    <LayoutWrapper
      title={t('app.title.profile.change-password')}
      breadcrumbs={{ rightComponent: <FormAction onSubmit={formik.submitForm} /> }}
    >
      <View p='20px' flexGrow={1} gap={2}>
        <Alert icon={false} variant='filled' severity='info'>
          {t('app.profile.change-password.description')}
        </Alert>
        <Section>
          <Grid container spacing={5}>
            <Grid item xs={12} lg={6}>
              <View gap={2}>
                <BoxInput>
                  <Label style={{ width: '30%' }}>{t('app.input.first-name.label')}</Label>
                  <TextField name='firstName' value={profile?.firstName} disabled />
                </BoxInput>
                <BoxInput>
                  <Label style={{ width: '30%' }}>{t('app.input.last-name.label')}</Label>
                  <TextField name='lastName' value={profile?.lastName} disabled />
                </BoxInput>
                <BoxInput>
                  <Label style={{ width: '30%' }}>{t('app.input.previous-password.label')}</Label>
                  <TextField
                    type='password'
                    name='previousPassword'
                    value={formik.values.previousPassword}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.previousPassword && Boolean(formik.errors.previousPassword)}
                    helperText={formik.touched.previousPassword && formik.errors.previousPassword}
                  />
                </BoxInput>
                <BoxInput>
                  <Label style={{ width: '30%' }}>{t('app.input.new-password.label')}</Label>
                  <TextField
                    type='password'
                    name='newPassword'
                    value={formik.values.newPassword}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                    helperText={formik.touched.newPassword && formik.errors.newPassword}
                  />
                </BoxInput>
                <BoxInput>
                  <Label style={{ width: '30%' }}>{t('app.input.new-password-repetition.label')}</Label>
                  <TextField
                    type='password'
                    name='reNewPassword'
                    value={formik.values.reNewPassword}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.reNewPassword && Boolean(formik.errors.reNewPassword)}
                    helperText={formik.touched.reNewPassword && formik.errors.reNewPassword}
                  />
                </BoxInput>
              </View>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Alert icon={false} variant='filled' severity='info'>
                <View p='5px 15px' gap={1}>
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
            </Grid>
          </Grid>
        </Section>
      </View>
    </LayoutWrapper>
  );
};

export default ProfileChangePasswordScreen;
