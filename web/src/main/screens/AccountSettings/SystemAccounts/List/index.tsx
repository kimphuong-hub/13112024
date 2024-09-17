import { Drawer, Grid, LinearProgress, Theme, useMediaQuery } from '@mui/material';
import { AxiosResponse, HttpStatusCode } from 'axios';
import { Suspense, lazy, useCallback, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import DataGrid from '~/base/components/Material/DataGrid';
import View from '~/base/components/Material/View';
import Section from '~/base/components/Material/View/Section';
import LayoutWrapper from '~/base/layout/Wrapper';
import KeyCode from '~/const/keycode';
import { saveAccountsPlanMapping } from '~/main/features/account-settings/group-accounts/action';
import { groupAccountsAction } from '~/main/features/account-settings/group-accounts/slice';
import { getSystemAccountsDetail } from '~/main/features/account-settings/system-accounts/action';
import { systemAccountsAction } from '~/main/features/account-settings/system-accounts/slice';
import { SystemAccountResponse } from '~/main/features/account-settings/system-accounts/types';
import { useKeyPress } from '~/main/hooks/useKeyPress';
import usePromptNotSaved from '~/main/hooks/usePromptChanged';
import { useDispatchApp, useSelectorApp } from '~/redux/store';
import TopBar from './TopBar';
import { useColumns } from './common/columns';
import { AccountsChangedType } from './common/types';
import { FormAction } from './components/FormAction';

const AccountTree = lazy(() => import('./components/AccountTree'));
const GroupAccountsAllocationItems = lazy(() => import('../../GroupAccounts/Update/components/Drawer/AllocationItems'));

const GroupSettingsSystemAccountsListScreen = () => {
  const { t } = useTranslation();
  const isMd = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
  const { innerHeight: height } = window;

  const [searchParams] = useSearchParams();
  const searchValue = searchParams.get('search') || '';

  const [selected, setSelected] = useState('');
  const [editSelected, setEditSelected] = useState('');

  const dispatch = useDispatchApp();
  const details = useSelectorApp((state) => state.accountSettings.systemAccounts.details);
  const { data: accounts = [], status } = details[selected] || {};

  const allocationItemsDrawer = useSelectorApp((state) => state.accountSettings.groupAccounts.allocationItemsDrawer);

  const [accountsChanged, setAccountsChanged] = useState<AccountsChangedType>({});
  const [visibleCreateDialog, setVisibleCreateDialog] = useState(false);
  const [visibleDeleteDialog, setVisibleDeleteDialog] = useState(false);

  const getData = useCallback(() => {
    if (selected) {
      dispatch(getSystemAccountsDetail({ systemAccountId: selected }));
    }
  }, [dispatch, selected]);

  useEffect(() => {
    getData();
  }, [getData]);

  const onSaveHandle = useCallback(() => {
    // because we save many group then we need to use Promise.all for many request
    return Promise.all(
      Object.values(accountsChanged).map(({ companyNo, systemAccountNo, companyAccountNo }) => {
        const accountsMapping = {
          company_no: companyNo,
          company_accounting_plan_mapping: [{ account_no: companyAccountNo, system_account_no: systemAccountNo }]
        };
        return dispatch(saveAccountsPlanMapping(accountsMapping)).then((response) => {
          const payload = response.payload as AxiosResponse;
          if (!payload || payload?.data?.status !== HttpStatusCode.Ok) {
            throw new Error(t('app.system.error.internal-server'));
          }
        });
      })
    );
  }, [accountsChanged, dispatch, t]);

  const onSaveSubmit = useCallback(() => {
    if (!Object.keys(accountsChanged).length) {
      toast.error(t('app.system.saved.no-changed'));
      return;
    }

    toast.promise(
      onSaveHandle().then(() => {
        // reload data
        dispatch(getSystemAccountsDetail({ systemAccountId: selected }));

        setEditSelected('');
        setAccountsChanged({});
        getData();
      }),
      {
        loading: t('app.system.loading.saving'),
        success: t('app.system.saved.success'),
        error: (error) => `${error.message || error || t('app.system.error.message')}`
      }
    );
  }, [accountsChanged, dispatch, getData, onSaveHandle, selected, t]);

  const accountEditSelected = useMemo(
    () => accounts.find((account) => account.id === editSelected),
    [accounts, editSelected]
  );

  const onAccountTreeSelectItemsEdit = useCallback(
    (account: SystemAccountResponse | null) => {
      if (!account || !accountEditSelected) {
        return;
      }

      const companyNo = accountEditSelected.companyNo;
      const companyAccountNo = accountEditSelected.accountNo;
      const systemAccountId = account.id;
      const systemAccountNo = account.accountNo;

      dispatch(
        systemAccountsAction.setSystemAccountDetailsItemById({
          id: selected,
          data: { accountId: editSelected, systemAccountRef: systemAccountId }
        })
      );
      setAccountsChanged((accounts) => ({
        ...accounts,
        [editSelected]: { companyNo, systemAccountId, systemAccountNo, companyAccountNo }
      }));
    },
    [accountEditSelected, dispatch, editSelected, selected]
  );

  const onAccountTreeSelectItems = useCallback(
    (account: SystemAccountResponse | null) => {
      if (editSelected) {
        onAccountTreeSelectItemsEdit(account);
        return;
      }

      if (account) {
        setSelected(account.id);
        return;
      }

      setSelected('');
    },
    [editSelected, onAccountTreeSelectItemsEdit]
  );

  const onCloseAllocationItemsDrawer = useCallback(
    () => dispatch(groupAccountsAction.setAllocationItemsDrawer(null)),
    [dispatch]
  );

  const accountsRows = useMemo(() => {
    const search = searchValue.toLowerCase();

    return accounts.filter((account) => {
      const accountName = account.accountName.toLowerCase();
      const accountNumber = account.accountNo.toLowerCase();
      const companyName = account.companyName.toLowerCase();
      const companyNumber = account.companyNo.toLowerCase();

      const searchCondition =
        accountName.includes(search) ||
        accountNumber.includes(search) ||
        companyName.includes(search) ||
        companyNumber.includes(search);

      return searchCondition;
    });
  }, [accounts, searchValue]);

  useKeyPress([KeyCode.VALUE_F2, KeyCode.VALUE_F3], (event) => {
    event.preventDefault();

    if (event.key === KeyCode.VALUE_F2) {
      onSaveSubmit();
    }

    if (event.key === KeyCode.VALUE_F3) {
      setVisibleCreateDialog(!visibleCreateDialog);
    }
  });

  usePromptNotSaved(Object.values(accountsChanged).length > 0);

  return (
    <LayoutWrapper
      title={t('app.title.account-settings.global-accounts')}
      breadcrumbs={{
        title: t('app.breadcrumb.account-settings'),
        rightComponent: <FormAction onSave={onSaveSubmit} />
      }}
    >
      <View id='drawer-container' position='relative' p='20px' flexDirection='row' flexGrow={1}>
        <Grid container spacing={2}>
          <Grid item display='flex' xs={12} md={6} lg={5} xl={4}>
            <Section flexGrow={1} gap={1} {...(!isMd && { height: height / 1.5 })}>
              <Suspense fallback={<LinearProgress />}>
                <AccountTree
                  account={accountEditSelected}
                  onSelectItems={onAccountTreeSelectItems}
                  visibleCreateDialog={visibleCreateDialog}
                  visibleDeleteDialog={visibleDeleteDialog}
                  onChangeVisibleCreateDialog={setVisibleCreateDialog}
                  onChangeVisibleDeleteDialog={setVisibleDeleteDialog}
                />
              </Suspense>
            </Section>
          </Grid>
          <Grid item display='flex' xs={12} md={6} lg={7} xl={8}>
            <Section flexGrow={1} gap={1} {...(!isMd && { height: height / 1.5 })}>
              <TopBar />
              <DataGrid
                name='account-settings.global-accounts'
                rows={accountsRows}
                columns={useColumns(t, {
                  onEdit: (id) => setEditSelected(id === editSelected ? '' : id)
                })}
                getRowId={(row) => row.id}
                loading={status === 'loading'}
              />
            </Section>
          </Grid>
        </Grid>
        <Drawer
          anchor='bottom'
          open={!!allocationItemsDrawer}
          onClose={onCloseAllocationItemsDrawer}
          slotProps={{ backdrop: { style: { position: 'absolute' } } }}
          PaperProps={{ style: { position: 'absolute' } }}
          ModalProps={{
            style: { position: 'absolute' },
            container: document.getElementById('drawer-container'),
            keepMounted: true
          }}
        >
          <Suspense fallback={<LinearProgress />}>
            {allocationItemsDrawer && <GroupAccountsAllocationItems {...allocationItemsDrawer} />}
          </Suspense>
        </Drawer>
      </View>
    </LayoutWrapper>
  );
};

export default GroupSettingsSystemAccountsListScreen;
