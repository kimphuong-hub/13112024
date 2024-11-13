import { TFunction } from 'i18next';
import * as yup from 'yup';

export type FormValues = {
  email: string;
  displayname: string;
  lastname: string;
  firstname: string;
  password: string;
  repeatPassword: string;
  userstype: string;
  securityrole: string;
};

export const initialValues: FormValues = {
  email: '',
  displayname: '',
  lastname: '',
  firstname: '',
  password: '',
  repeatPassword: '',
  userstype: '',
  securityrole: '',
};


export const validationSchema = (t: TFunction<'translation', undefined>) =>
  yup.object({
    email: yup.string().email(t('app.input.email.invalid')).required(t('app.input.email.required')),
    displayname: yup.string().required(t('app.input.display-name.required')),
    lastname: yup.string().required(t('app.input.last-name.required')),
    firstname: yup.string().required(t('app.input.first-name.required')),
    password: yup
      .string()
      .required(t('app.profile.master-data.input.new-password.required'))
      .min(10, t('app.password.condition.description.1'))
      .test('contains-numbers', t('app.profile.change-password.condition.description.2'), (value = '') =>
        /[\d]/.test(value)
      )
      .test('contains-uppercase', t('app.profile.change-password.condition.description.3'), (value = '') =>
        /[A-Z]/.test(value)
      )
      .test('contains-lowercase', t('app.profile.change-password.condition.description.4'), (value = '') =>
        /[a-z]/.test(value)
      )
      .test('contains-special', t('app.profile.change-password.condition.description.5'), (value = '') =>
        /[^\w\s]/.test(value)
      ),
      repeatPassword: yup
      .string()
      .required(t('app.profile.master-data.input.new-password-repetition.required'))
      .oneOf([yup.ref('password')], t('app.profile.change-password.condition.match')),
      userstype: yup.string().required(t('app.errors.user-type.required')),
      securityrole: yup.string().required(t('app.errors.user-type.required')),
  });