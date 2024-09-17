import { CircularProgress, Typography } from '@mui/material';
import { FormikHelpers, useFormik } from 'formik';
import BoxInput from '~/base/components/Material/Box/Input';
import Dialog from '~/base/components/Material/Dialog';
import Label from '~/base/components/Material/Form/Label';
import TextField from '~/base/components/Material/Form/TextField';
import View from '~/base/components/Material/View';
import { FormValues, initialValues, validationSchema } from './common/form';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { useCallback, useState } from 'react';
import { SystemAccountResponse } from '~/main/features/account-settings/system-accounts/types';
import { useDispatchApp } from '~/redux/store';
import { createSystemAccount } from '~/main/features/account-settings/system-accounts/action';
import { AxiosResponse, HttpStatusCode } from 'axios';

type Props = {
  open: boolean;
  onClose: () => void;
  account: SystemAccountResponse | null;
  onRefresh: () => void;
};

const GroupSettingsSystemAccountsCreateDialog = (props: Props) => {
  const { open, onClose, account, onRefresh } = props;

  const { t } = useTranslation();

  const dispatch = useDispatchApp();

  const [loading, setLoading] = useState(false);

  const onSubmit = useCallback(
    (values: FormValues, formik: FormikHelpers<FormValues>) => {
      if (loading) {
        return;
      }

      setLoading(true);

      const {
        globalAccountNumber: account_no,
        globalAccountNameDE: account_name_de,
        globalAccountNameEN: account_name_en,
        globalAccountNameVI: account_name_vn
      } = values;

      toast.promise(
        dispatch(
          createSystemAccount({
            account_no: account_no || 0,
            account_name_de,
            account_name_en,
            account_name_vn,
            parent_account_id: account?.id || null,
            parent_account_no: account?.accountNo || null
          })
        )
          .then((response) => {
            const payload = response.payload as AxiosResponse;
            if (payload.data.status !== HttpStatusCode.Ok) {
              if (payload.data?.message?.includes('Account is already existed')) {
                throw new Error(t('app.account-settings.create-group-accounts.exists'));
              }
              throw new Error(t('app.system.error.internal-server'));
            }

            onClose();
            formik.resetForm();

            onRefresh();
          })
          .finally(() => setLoading(false)),
        {
          loading: t('app.system.loading.processing'),
          success: t('app.system.created.success'),
          error: (error) => `${error.message || error || t('app.system.error.message')}`
        }
      );
    },
    [account?.accountNo, account?.id, dispatch, loading, onClose, onRefresh, t]
  );

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema(t),
    onSubmit
  });

  return (
    <Dialog.Wrapper open={open} PaperProps={{ sx: { maxWidth: 800 } }} onClose={onClose}>
      <Dialog.Header title={t('app.account-settings.create-group-accounts.title')} onClose={onClose} />
      <Dialog.Content>
        <View width='800px' p='20px' gap={3}>
          {account && (
            <Typography>
              {account?.accountNo} - {account?.accountName}
            </Typography>
          )}
          <View gap={1}>
            <BoxInput>
              <Label style={{ width: '30%' }} required>
                {t('app.account-settings.create-group-accounts.global-account-number')}
              </Label>
              <TextField
                name='globalAccountNumber'
                value={formik.values.globalAccountNumber}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={formik.touched.globalAccountNumber && Boolean(formik.errors.globalAccountNumber)}
                helperText={formik.touched.globalAccountNumber && formik.errors.globalAccountNumber}
              />
            </BoxInput>
            <BoxInput>
              <Label style={{ width: '30%' }} required>
                {`${t('app.account-settings.create-group-accounts.global-account-name')} (DE)`}
              </Label>
              <TextField
                name='globalAccountNameDE'
                value={formik.values.globalAccountNameDE}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={formik.touched.globalAccountNameDE && Boolean(formik.errors.globalAccountNameDE)}
                helperText={formik.touched.globalAccountNameDE && formik.errors.globalAccountNameDE}
              />
            </BoxInput>
            <BoxInput>
              <Label style={{ width: '30%' }}>
                {`${t('app.account-settings.create-group-accounts.global-account-name')} (EN)`}
              </Label>
              <TextField
                name='globalAccountNameEN'
                value={formik.values.globalAccountNameEN}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={formik.touched.globalAccountNameEN && Boolean(formik.errors.globalAccountNameEN)}
                helperText={formik.touched.globalAccountNameEN && formik.errors.globalAccountNameEN}
              />
            </BoxInput>
            <BoxInput>
              <Label style={{ width: '30%' }}>
                {`${t('app.account-settings.create-group-accounts.global-account-name')} (VI)`}
              </Label>
              <TextField
                name='globalAccountNameVI'
                value={formik.values.globalAccountNameVI}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={formik.touched.globalAccountNameVI && Boolean(formik.errors.globalAccountNameVI)}
                helperText={formik.touched.globalAccountNameVI && formik.errors.globalAccountNameVI}
              />
            </BoxInput>
          </View>
        </View>
      </Dialog.Content>
      <Dialog.Footer>
        <View flexDirection='row' justifyContent='flex-end' gap={1}>
          <Dialog.Button color='secondary' onClick={() => formik.handleSubmit()}>
            {loading && <CircularProgress size={12.5} sx={{ mr: 1 }} />}
            {t('app.account-settings.create-group-accounts.create.button')}
          </Dialog.Button>
          <Dialog.Button onClick={onClose}>{t('app.system.cancel.button')}</Dialog.Button>
        </View>
      </Dialog.Footer>
    </Dialog.Wrapper>
  );
};

export default GroupSettingsSystemAccountsCreateDialog;
