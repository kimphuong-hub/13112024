import { Divider, FormControl, Grid } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import BoxInput from '~/base/components/Material/Box/Input';
import Label from '~/base/components/Material/Form/Label';
import TextField from '~/base/components/Material/Form/TextField';
import View from '~/base/components/Material/View';
import Section from '~/base/components/Material/View/Section';
import LayoutWrapper from '~/base/layout/Wrapper';
import { FormAction } from './components/FormAction';
import { validationSchema } from './common/form';
import { SelectItem } from '~/base/components/Material/Form/Select/SelectItem';
import Select from '~/base/components/Material/Form/Select';
import { useDispatchApp } from '~/redux/store';
import { updateUserData } from '~/main/features/users/action';
import toast from 'react-hot-toast';
import Typography from '~/base/components/Material/Typography';
import Dialog from '~/base/components/Material/Dialog';

const SecurityroleUserScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatchApp();
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/groupAccounts/${id}`);
      const data = await response.json();
      console.log('Fetched data:', data);

      if (data) {
        setUserData(data);
        console.log('User Data:', data);
      } else {
        console.error('User not found');
        setUserData(null);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setUserData(null);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const initializeFormik = useCallback(() => {
    return useFormik({
      initialValues: {
        email: userData?.email || '',
        displayname: userData?.displayname || '',
        firstname: userData?.firstname || '',
        lastname: userData?.lastname || '',
        userstype: userData?.userstype || '',
        securityrole: userData?.securityrole || '',

      },
      validationSchema: validationSchema(t),
      enableReinitialize: true,
      onSubmit: async (values) => {
        console.log('Submitting values:', values);
        try {
          const updatedUser = await updateUserData(id, values);
          console.log('Updated user:', updatedUser);
          toast.success(t('app.success.user.saved'));
          navigate('/users/users');
        } catch (error) {
          console.error('Error updating user:', error);
          toast.error(t('app.errors.save.failed'));
        }
      },
    });

  }, [userData, validationSchema, t]);

  const formik = initializeFormik();
  const handleSaveAndBack = useCallback(async () => {
    await formik.submitForm();
    navigate('/users/users');
  }, [formik, navigate]);

  const handleCancel = useCallback(() => {
    navigate(-1); 
  }, [navigate]);
  return (
    <LayoutWrapper
      title={t('app.title.users.editusers')}
      breadcrumbs={{ rightComponent: <FormAction onSubmit={formik.submitForm} /> }}
    >
      <View p='20px' flexGrow={1} gap={2}>
        <Section>
          <Typography style={{ fontSize: 14 }}>{t('app.users.info.title')}</Typography>
          <Divider />
          <Grid container spacing={5}>
            <Grid item xs={12} lg={6}>
              <View gap={2}>
                <BoxInput>
                  <Label style={{ width: '30%' }}>{t('app.users.users.columns.email')}</Label>
                  <TextField
                    name='email'
                    value={formik.values.email}
                    disabled />
                </BoxInput>
                <BoxInput>
                  <Label style={{ width: '30%' }}>{t('app.users.users.columns.displayname')}</Label>
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
                  <Label style={{ width: '30%' }}>{t('app.users.users.columns.firstname')}</Label>
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
                  <Label style={{ width: '30%' }}>{t('app.users.users.columns.lastname')}</Label>
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
                  <Label style={{ width: '30%' }}>{t('app.users.users.columns.usertype')}</Label>
                  <Select
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
              <Label style={{ width: '30%' }}>{t('app.users.users.columns.securityrole')}</Label>
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
          </Grid>
          <Divider />
          <View flexDirection='row' justifyContent='flex-end' gap={1}>
          <Dialog.Button color='secondary' onClick={handleSaveAndBack}>Save and back</Dialog.Button>
          <Dialog.Button color='secondary'   onClick={formik.submitForm}>Save</Dialog.Button>
          <Dialog.Button onClick={handleCancel}>Cancle</Dialog.Button>
        </View>
        </Section>
      </View>
    </LayoutWrapper>
  );
};

export default SecurityroleUserScreen;
