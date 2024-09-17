import { TFunction } from 'i18next';
import * as yup from 'yup';

export type FormValues = {
  email: string;
  password: string;
};

export const initialValues: FormValues = {
  email: '',
  password: ''
};

export const validationSchema = (t: TFunction<'translation', undefined>) =>
  yup.object({
    email: yup.string().email(t('app.input.email.invalid')).required(t('app.input.email.required')),
    password: yup.string().required(t('app.input.password.required'))
  });
