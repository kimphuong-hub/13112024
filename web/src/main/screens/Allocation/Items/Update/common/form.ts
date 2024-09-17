import { TFunction } from 'i18next';
import * as yup from 'yup';
import { GroupAccountResponse } from '~/main/features/account-settings/group-accounts/types';
import { SystemAccountResponse } from '~/main/features/account-settings/system-accounts/types';

export type FormValues = {
  groupAccount: GroupAccountResponse | null;
  systemAccount: SystemAccountResponse | null;
};

export const initialValues: FormValues = {
  groupAccount: null,
  systemAccount: null
};

export const validationSchema = (t: TFunction<'translation', undefined>) =>
  yup.object({
    groupAccount: yup.mixed().required(t('app.allocation.items.info.input.group-account.required')),
    systemAccount: yup.mixed().nullable()
  });
