import { TFunction } from 'i18next';
import * as yup from 'yup';

export type FormValues = {
  email: string;
  displayname: string;
  lastname: string;
  firstname: string;
  userstype: string;
  securityrole: string;

};

export const initialValues: FormValues = {
  email: '',
  displayname: '',
  lastname: '',
  firstname: '',
  userstype: '',
  securityrole: '',

};


export const validationSchema = (t: TFunction<'translation', undefined>) =>
  yup.object({
    email: yup.string().email(t('app.input.email.invalid')).required(t('app.input.email.required')),
    displayname: yup.string().required(t('app.input.display-name.required')),
    lastname: yup.string().required(t('app.input.last-name.required')),
    firstname: yup.string().required(t('app.input.first-name.required')),
      userstype: yup.string().required(t('app.errors.user-type.required')),
      securityrole: yup.string().required(t('app.errors.user-type.required')),

  });