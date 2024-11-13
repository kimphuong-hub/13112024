import { TFunction } from 'i18next';
import * as yup from 'yup';

export type FormValues = {
  name: string | null;
  description: string;
};

export const initialValues: FormValues = {
  name: '',
  description: ''
};

export const validationSchema = (t: TFunction<'translation', undefined>) =>
  yup.object({
    name: yup.string().required(t('app.input.user-type.name')),
    description: yup.string().required(t('app.input.user-type.description'))
  });
