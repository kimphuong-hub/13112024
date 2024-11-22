
import { Divider, FormControl, Grid } from '@mui/material';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import Alert from '~/base/components/Material/Alert';
import BoxInput from '~/base/components/Material/Box/Input';
import Label from '~/base/components/Material/Form/Label';
import TextField from '~/base/components/Material/Form/TextField';
import View from '~/base/components/Material/View';
import Section from '~/base/components/Material/View/Section';
import LayoutWrapper from '~/base/layout/Wrapper';
import { FormAction } from './components/FormAction';
import Dialog from '~/base/components/Material/Dialog';
import toast from 'react-hot-toast';
import SelectItem from '~/base/components/Material/Form/Select/SelectItem';
import Select from '~/base/components/Material/Form/Select';
import { initialValues, validationSchema } from './common/form';
import { checkEmailExists, saveUserData } from '~/main/features/users/action';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import Typography from '~/base/components/Material/Typography';

const ConditionView = ({ test }: { test: boolean }) =>
  test ? <View color='green'>✔</View> : <View color='red'>✖</View>;

const NewUsersScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema(t),
    onSubmit: async (values) => {
      console.log('Submitting values:', values);
      try {
        const emailExists = await checkEmailExists(values.email);
        if (emailExists) {
          toast.error(t('app.errors.email.exists'));
          return;
        }
        await saveUserData(values);
        toast.success(t('app.success.user.saved'));
        navigate('/users/users');
      } catch (error) {
        toast.error(t('app.errors.save.failed'));
      }
    },
  });

  const handleSaveAndBack = useCallback(async () => {
    await formik.submitForm();
    navigate(-1);
  }, [formik, navigate]);

  const handleCancel = useCallback(() => {
    navigate(-1);
  }, [navigate]);
  return (
    <LayoutWrapper
      title={t('app.title.users.newusers')}
      breadcrumbs={{ rightComponent: <FormAction onSubmit={formik.handleSubmit} /> }}
    >
      <Section>
        <Typography style={{ fontSize: 14 }}>{t('app.users.info.title')}</Typography>
        <Divider />
        <Grid container spacing={5}>
          <Grid item xs={12} lg={6}>

            <View gap={2}>

              <BoxInput>
                <Label style={{ width: '20%' }}>{t('app.users.users.columns.email')}</Label>
                <TextField
                  name='email'
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </BoxInput>
              <BoxInput>
                <Label style={{ width: '20%' }}>{t('app.users.users.columns.displayname')}</Label>
                <TextField
                  name='displayname'
                  value={formik.values.displayname}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  error={formik.touched.displayname && Boolean(formik.errors.displayname)}
                  helperText={formik.touched.displayname && formik.errors.displayname}
                />
              </BoxInput>
              <BoxInput>
                <Label style={{ width: '20%' }}>{t('app.users.users.columns.lastname')}</Label>
                <TextField
                  name='lastname'
                  value={formik.values.lastname}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  error={formik.touched.lastname && Boolean(formik.errors.lastname)}
                  helperText={formik.touched.lastname && formik.errors.lastname}
                />
              </BoxInput>
              <BoxInput>
                <Label style={{ width: '20%' }}>{t('app.users.users.columns.firstname')}</Label>
                <TextField
                  name='firstname'
                  value={formik.values.firstname}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  error={formik.touched.firstname && Boolean(formik.errors.firstname)}
                  helperText={formik.touched.firstname && formik.errors.firstname}
                />
              </BoxInput>
              <BoxInput>
                <Label style={{ width: '20%' }}>{t('app.users.users.columns.password')}</Label>
                <TextField
                  type='password'
                  name='password'
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                />
              </BoxInput>
              <BoxInput>
                <Label style={{ width: '20%' }}>{t('app.users.users.columns.repeatpassword')}</Label>
                <TextField
                  type='password'
                  name='repeatPassword'
                  value={formik.values.repeatPassword}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  error={formik.touched.repeatPassword && Boolean(formik.errors.repeatPassword)}
                  helperText={formik.touched.repeatPassword && formik.errors.repeatPassword}
                />
              </BoxInput>
              <BoxInput>
                <Label style={{ width: '20%' }}>{t('app.users.users.columns.usertype')}</Label>
                <Select
                  type='userstype'
                  name='userstype'
                  value={formik.values.userstype}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  error={formik.touched.userstype && Boolean(formik.errors.userstype)}
                >
                  <SelectItem value='System'>System</SelectItem>
                  <SelectItem value='Partner'>Partner</SelectItem>
                  <SelectItem value='Company'>Company</SelectItem>
                  <SelectItem value='Site'>Site</SelectItem>
                </Select>
              </BoxInput>
              <BoxInput>
              <Label style={{ width: '20%' }}>{t('app.users.users.columns.securityrole')}</Label>
              <Select
                  labelId="security-role-label"
                  id="security-role"
                  name="securityrole"
                  value={formik.values.securityrole}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <SelectItem value="BornDigital_Team">BornDigital_Team</SelectItem>
                  <SelectItem value="BornDigital_V1">BornDigital_V1</SelectItem>
                  <SelectItem value="VI_TOP_Born_BY_GMD-ID">VI TOP Born BY GMD-ID</SelectItem>
                  <SelectItem value="BornDigital_Team_No_GMD">BornDigital_Team_No_GMD</SelectItem>
                </Select>
                </BoxInput>

            </View>
          </Grid>

          <Grid item xs={12} lg={6}>
            <br />
            <Alert icon={false} variant='filled' severity='info'>
              <View p='5px 15px' gap={1}>
                <View>{t('app.password.condition.title')}</View>
                <View>
                  <View flexDirection='row' gap={1}>
                    {t('app.password.condition.1')}
                    <ConditionView test={formik.values.password.length >= 10} />
                  </View>
                  <View flexDirection='row' gap={1}>
                    {t('app.password.condition.2')}
                    <ConditionView test={/[\d]/.test(formik.values.password)} />
                  </View>
                  <View flexDirection='row' gap={1}>
                    {t('app.password.condition.3')}
                    <ConditionView test={/[A-Z]/.test(formik.values.password)} />
                  </View>
                  <View flexDirection='row' gap={1}>
                    {t('app.password.condition.4')}
                    <ConditionView test={/[a-z]/.test(formik.values.password)} />
                  </View>
                  <View flexDirection='row' gap={1}>
                    {t('app.password.condition.5')}
                    <ConditionView test={/[^\w\s]/.test(formik.values.password)} />
                  </View>
                </View>
              </View>
            </Alert>
          </Grid>
        </Grid>
        <Divider sx={{ marginY: 1 }} />
        <View flexDirection='row' justifyContent='flex-end' gap={1}>
          <Dialog.Button color='secondary' onClick={handleSaveAndBack}>Save and back</Dialog.Button>
          <Dialog.Button color='secondary' onClick={formik.handleSubmit}>Save</Dialog.Button>
          <Dialog.Button onClick={handleCancel}>Cancle</Dialog.Button>
        </View>

      </Section>
    </LayoutWrapper>
  );
};

export default NewUsersScreen;
