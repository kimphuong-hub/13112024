import { Grid, SelectChangeEvent, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Accordion, AccordionDetails, AccordionSummary } from '~/base/components/Material/Accordion';
import Label from '~/base/components/Material/Form/Label';
import Select from '~/base/components/Material/Form/Select';
import SelectItem from '~/base/components/Material/Form/Select/SelectItem';
import TextField from '~/base/components/Material/Form/TextField';
import View from '~/base/components/Material/View';
import LayoutWrapper from '~/base/layout/Wrapper';
import { objectToArray } from '~/core/commonFuncs';
import { i18nResources } from '~/core/i18n';
import { commonAction } from '~/redux/common/slice';
import { useDispatchApp, useSelectorApp } from '~/redux/store';
import { FormValues, initialValues, validationSchema } from './common/form';
import { FormAction } from './components/FormAction';
import { saveCommonConfiguration } from '~/redux/common/action';
import toast from 'react-hot-toast';

const ProfileSettingsScreen = () => {
  const { t } = useTranslation();

  const dispatch = useDispatchApp();
  const common = useSelectorApp((state) => state.common);
  const profile = useSelectorApp((state) => state.auth.data.profile);

  const [expanded, setExpanded] = useState('panel1');

  const onExpanded = useCallback((name: string, expanded: boolean) => {
    setExpanded(expanded ? name : '');
  }, []);

  const onSubmit = useCallback(
    (values: FormValues) => {
      const { theme, language } = values;
      toast.promise(dispatch(saveCommonConfiguration({ theme, language })), {
        loading: t('app.system.loading.saving'),
        success: t('app.system.saved.success'),
        error: (error) => `${error.message || error || t('app.system.error.message')}`
      });
    },
    [dispatch, t]
  );

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema(t),
    onSubmit
  });

  useEffect(() => {
    if (!common || !profile) {
      return;
    }

    formik.setFieldValue('theme', common.theme);
    formik.setFieldValue('language', common.language);

    formik.setFieldValue('email', profile.email);
    formik.setFieldValue('firstName', profile.firstName);
    formik.setFieldValue('lastName', profile.lastName);
    formik.setFieldValue('displayName', `${profile.lastName} ${profile.firstName}`);
    formik.setFieldValue('userType', profile.userType);
    formik.setFieldValue('userType', profile.userType);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  const onChangeTheme = useCallback(
    (event: SelectChangeEvent<unknown>) => {
      formik.handleChange(event);

      const { value } = event.target;
      dispatch(commonAction.setTheme(value));
    },
    [dispatch, formik]
  );

  const onChangeLanguage = useCallback(
    (event: SelectChangeEvent<unknown>) => {
      formik.handleChange(event);

      const { value } = event.target;
      dispatch(commonAction.setLanguage(value));
    },
    [dispatch, formik]
  );

  return (
    <LayoutWrapper
      title={t('app.title.profile.settings')}
      breadcrumbs={{ rightComponent: <FormAction onSubmit={formik.handleSubmit} /> }}
    >
      <View p='20px'>
        <Accordion expanded={expanded === 'panel1'} onChange={(_, expanded) => onExpanded('panel1', expanded)}>
          <AccordionSummary>
            <Typography style={{ fontSize: 14 }}>{t('app.profile.master-data.title')}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={6}>
                <View alignItems='end' gap={2}>
                  <View flexDirection='row' alignItems='center' gap={4} sx={{ width: { xs: '100%', lg: '70%' } }}>
                    <Label style={{ width: '20%' }}>{t('app.input.user-type.label')}</Label>
                    <Select
                      name='userType'
                      value={formik.values.userType}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      error={formik.touched.userType && Boolean(formik.errors.userType)}
                      disabled
                    >
                      <SelectItem value='User'>User</SelectItem>
                      <SelectItem value='System'>System</SelectItem>
                    </Select>
                  </View>
                  <View flexDirection='row' alignItems='center' gap={4} sx={{ width: { xs: '100%', lg: '70%' } }}>
                    <Label style={{ width: '20%' }}>{t('app.input.first-name.label')}</Label>
                    <TextField
                      name='firstName'
                      value={formik.values.firstName}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                      helperText={formik.touched.firstName && formik.errors.firstName}
                    />
                  </View>
                  <View flexDirection='row' alignItems='center' gap={4} sx={{ width: { xs: '100%', lg: '70%' } }}>
                    <Label style={{ width: '20%' }}>{t('app.input.last-name.label')}</Label>
                    <TextField
                      name='lastName'
                      value={formik.values.lastName}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                      helperText={formik.touched.lastName && formik.errors.lastName}
                    />
                  </View>
                  <View flexDirection='row' alignItems='center' gap={4} sx={{ width: { xs: '100%', lg: '70%' } }}>
                    <Label style={{ width: '20%' }}>{t('app.input.number-format.label')}</Label>
                    <Select
                      name='numberFormat'
                      value={formik.values.numberFormat}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      error={formik.touched.numberFormat && Boolean(formik.errors.numberFormat)}
                      disabled
                    >
                      <SelectItem value={1}>1,234.56</SelectItem>
                      <SelectItem value={2}>1234.56</SelectItem>
                      <SelectItem value={3}>1.234,56</SelectItem>
                    </Select>
                  </View>
                </View>
              </Grid>
              <Grid item xs={12} lg={6}>
                <View alignItems='end' gap={2}>
                  <View flexDirection='row' alignItems='center' gap={4} sx={{ width: { xs: '100%', lg: '70%' } }}>
                    <Label style={{ width: '20%' }}>{t('app.input.email.label')}</Label>
                    <TextField
                      name='email'
                      value={formik.values.email}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      error={formik.touched.email && Boolean(formik.errors.email)}
                      helperText={formik.touched.email && formik.errors.email}
                      disabled
                    />
                  </View>
                  <View flexDirection='row' alignItems='center' gap={4} sx={{ width: { xs: '100%', lg: '70%' } }}>
                    <Label style={{ width: '20%' }}>{t('app.input.display-name.label')}</Label>
                    <TextField
                      name='displayName'
                      value={formik.values.displayName}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      error={formik.touched.displayName && Boolean(formik.errors.displayName)}
                      helperText={formik.touched.displayName && formik.errors.displayName}
                    />
                  </View>
                  <View flexDirection='row' alignItems='center' gap={4} sx={{ width: { xs: '100%', lg: '70%' } }}>
                    <Label style={{ width: '20%' }}>{t('app.input.theme.label')}</Label>
                    <Select
                      name='theme'
                      value={formik.values.theme}
                      onBlur={formik.handleBlur}
                      onChange={onChangeTheme}
                      error={formik.touched.theme && Boolean(formik.errors.theme)}
                    >
                      <SelectItem value='dark'>{t('app.input.theme.dark.option')}</SelectItem>
                      <SelectItem value='light'>{t('app.input.theme.light.option')}</SelectItem>
                    </Select>
                  </View>
                  <View flexDirection='row' alignItems='center' gap={4} sx={{ width: { xs: '100%', lg: '70%' } }}>
                    <Label style={{ width: '20%' }}>{t('app.input.language.label')}</Label>
                    <Select
                      name='language'
                      value={formik.values.language}
                      onBlur={formik.handleBlur}
                      onChange={onChangeLanguage}
                      error={formik.touched.language && Boolean(formik.errors.language)}
                    >
                      {objectToArray(i18nResources).map((language: { key: string } & (typeof i18nResources)['en']) => (
                        <SelectItem key={language.key} value={language.key}>
                          {language.title}
                        </SelectItem>
                      ))}
                    </Select>
                  </View>
                </View>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </View>
    </LayoutWrapper>
  );
};

export default ProfileSettingsScreen;
