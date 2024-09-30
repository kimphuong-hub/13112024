import { TFunction } from 'i18next';
import * as yup from 'yup';
import { i18nResources } from '~/core/i18n';

export type FormValues = {
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  userType: 'User' | 'System';
  theme: 'dark' | 'light' | null;
  language: keyof typeof i18nResources | null;
  numberFormat: number;
};

export const initialValues: FormValues = {
  email: '',
  firstName: '',
  lastName: '',
  displayName: '',
  userType: 'User',
  theme: 'light',
  language: 'en',
  numberFormat: 1
};

export const validationSchema = (t: TFunction<'translation', undefined>) =>
  yup.object({
    email: yup
      .string()
      .email(t('app.profile.master-data.input.email.invalid'))
      .required(t('app.profile.master-data.input.email.required')),
    firstName: yup.string().required(t('app.profile.master-data.input.first-name.required')),
    lastName: yup.string().required(t('app.profile.master-data.input.last-name.required')),
    displayName: yup.string().required(t('app.profile.master-data.input.display-name.required')),
    userType: yup.string()
  });
