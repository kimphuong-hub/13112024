import { TFunction } from 'i18next';
import * as yup from 'yup';

export type FormValues = {
  Name: string | null;
  Description: string;
};

export const initialValues: FormValues = {
  Name: '',
  Description: ''
};

export const validationSchema = (t: TFunction<'translation', undefined>) =>
  yup.object({
    Name: yup.string().required(t('app.input.user-type.name')),
    Description: yup.string().required(t('app.input.user-type.description'))
  });
