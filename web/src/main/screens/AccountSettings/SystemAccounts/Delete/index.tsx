import { CircularProgress } from '@mui/material';
import { AxiosResponse, HttpStatusCode } from 'axios';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import Dialog from '~/base/components/Material/Dialog';
import View from '~/base/components/Material/View';
import { deleteSystemAccount } from '~/main/features/account-settings/system-accounts/action';
import { SystemAccountResponse } from '~/main/features/account-settings/system-accounts/types';
import { useDispatchApp } from '~/redux/store';

type Props = {
  open: boolean;
  onClose: () => void;
  account: SystemAccountResponse;
  onRefresh: () => void;
};

const GroupSettingsSystemAccountsDeleteDialog = (props: Props) => {
  const { open, onClose, account, onRefresh } = props;

  const { t } = useTranslation();

  const dispatch = useDispatchApp();

  const [loading, setLoading] = useState(false);

  const onSubmit = useCallback(() => {
    if (loading) {
      return;
    }

    setLoading(true);

    if (!account) {
      return;
    }

    toast.promise(
      dispatch(deleteSystemAccount(account.id))
        .then((response) => {
          const payload = response.payload as AxiosResponse;
          if (payload.data.status !== HttpStatusCode.Ok) {
            if (payload.data?.message?.includes('Account is used in invoice')) {
              throw new Error(t('app.account-settings.create-group-accounts.used-in-invoice'));
            }
            throw new Error(t('app.system.error.internal-server'));
          }

          onClose();
          onRefresh();
        })
        .finally(() => setLoading(false)),
      {
        loading: t('app.system.loading.processing'),
        success: t('app.system.delete.success'),
        error: (error) => `${error.message || error || t('app.system.error.message')}`
      }
    );
  }, [account, dispatch, loading, onClose, onRefresh, t]);

  return (
    <Dialog.Wrapper open={open} PaperProps={{ sx: { maxWidth: 800 } }} onClose={onClose}>
      <Dialog.Header title={t('app.account-settings.delete-group-accounts.title')} onClose={onClose} />
      <Dialog.Content>
        <View width='800px' p='20px' gap={3}>
          {`${t('app.account-settings.delete-group-accounts.question')} (${account.accountNo} - ${account.accountName})`}
        </View>
      </Dialog.Content>
      <Dialog.Footer>
        <View flexDirection='row' justifyContent='flex-end' gap={1}>
          <Dialog.Button color='secondary' onClick={onSubmit}>
            {loading && <CircularProgress size={12.5} sx={{ mr: 1 }} />}
            {t('app.account-settings.delete-group-accounts.delete.button')}
          </Dialog.Button>
          <Dialog.Button onClick={onClose}>{t('app.system.cancel.button')}</Dialog.Button>
        </View>
      </Dialog.Footer>
    </Dialog.Wrapper>
  );
};

export default GroupSettingsSystemAccountsDeleteDialog;
