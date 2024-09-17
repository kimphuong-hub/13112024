import { TFunction } from 'i18next';
import * as yup from 'yup';

export type FormValues = {
  email: string;
};

export const initialValues: FormValues = {
  email: ''
};

export const validationSchema = (t: TFunction<'translation', undefined>) =>
  yup.object({
    email: yup.string().email(t('app.input.email.invalid')).required(t('app.input.email.required'))
  });
