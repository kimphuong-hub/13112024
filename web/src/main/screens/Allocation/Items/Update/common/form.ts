import { TFunction } from 'i18next';
import * as yup from 'yup';
import { GroupAccountResponse } from '~/main/features/account-settings/group-accounts/types';
import { SystemAccountResponse } from '~/main/features/account-settings/system-accounts/types';
import { allowedStatusReplyClarification } from './config';

export type FormValues = {
  replyStatus: string;
  replyComment: string;
  groupAccount: GroupAccountResponse | null;
  systemAccount: SystemAccountResponse | null;
};

export const initialValues: FormValues = {
  replyStatus: 'checked',
  replyComment: '',
  groupAccount: null,
  systemAccount: null
};

export const getFormKeyNames = (t: TFunction<'translation', undefined>): { [key in keyof FormValues]: string } => ({
  replyStatus: t('app.allocation.items.clarification.comment.status.label'),
  replyComment: t('app.allocation.items.clarification.comment.reply.label'),
  groupAccount: t('app.allocation.items.info.group-account'),
  systemAccount: t('app.allocation.items.info.global-account')
});

export const validationSchema = (t: TFunction<'translation', undefined>, status: string) =>
  yup.object({
    ...(allowedStatusReplyClarification.includes(status) && {
      replyStatus: yup
        .string()
        .oneOf(['checked', 'pending'], t('app.input.validation.invalid'))
        .required(t('app.input.validation.required'))
    }),
    groupAccount: yup.mixed().nullable(),
    systemAccount: yup.mixed().required(t('app.input.validation.required'))
  });
