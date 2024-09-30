import { TFunction } from 'i18next';
import * as yup from 'yup';

export type FormValues = {
  comment: string;
  problemTypeId: string | null;
};

export const initialValues: FormValues = {
  comment: '',
  problemTypeId: null
};

export const validationSchema = (t: TFunction<'translation', undefined>) =>
  yup.object({
    comment: yup.string().required(t('app.input.validation.required')),
    problemTypeId: yup.string().required(t('app.input.validation.required'))
  });
