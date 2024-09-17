import { TFunction } from 'i18next';
import * as yup from 'yup';

export type FormValues = {
  newPassword: string;
  reNewPassword: string;
  previousPassword: string;
};

export const initialValues: FormValues = {
  newPassword: '',
  reNewPassword: '',
  previousPassword: ''
};

export const validationSchema = (t: TFunction<'translation', undefined>) =>
  yup.object({
    newPassword: yup
      .string()
      .required(t('app.input.new-password.required'))
      .min(10, t('app.password.condition.description.1'))
      .test('contains-numbers', t('app.password.condition.description.2'), (value = '') => /[\d]/.test(value))
      .test('contains-uppercase', t('app.password.condition.description.3'), (value = '') => /[A-Z]/.test(value))
      .test('contains-lowercase', t('app.password.condition.description.4'), (value = '') => /[a-z]/.test(value))
      .test('contains-special', t('app.password.condition.description.5'), (value = '') => /[^\w\s]/.test(value)),
    reNewPassword: yup
      .string()
      .required(t('app.password.new-password-repetition.required'))
      .oneOf([yup.ref('newPassword')], t('app.password.condition.match')),
    previousPassword: yup.string().required(t('app.password.previousPassword.required'))
  });
