import { TFunction } from 'i18next';
import * as yup from 'yup';

export type FormValues = {
  globalAccountNumber: number | null;
  globalAccountNameDE: string;
  globalAccountNameEN: string;
  globalAccountNameVI: string;
};

export const initialValues: FormValues = {
  globalAccountNumber: null,
  globalAccountNameDE: '',
  globalAccountNameEN: '',
  globalAccountNameVI: ''
};

export const validationSchema = (t: TFunction<'translation', undefined>) =>
  yup.object({
    globalAccountNumber: yup
      .number()
      .required(t('app.account-settings.create-group-accounts.global-account-number.required'))
      .typeError(t('app.account-settings.create-group-accounts.global-account-number.required')),
    globalAccountNameDE: yup
      .string()
      .required(t('app.account-settings.create-group-accounts.global-account-name.required'))
  });
