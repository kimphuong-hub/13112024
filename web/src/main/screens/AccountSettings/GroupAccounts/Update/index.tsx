import { CircularProgress, Drawer, Grid, LinearProgress, Theme, useMediaQuery } from '@mui/material';
import { GridCellParams, GridRowSelectionModel } from '@mui/x-data-grid';
import { AxiosResponse, HttpStatusCode } from 'axios';
import { Fragment, Suspense, lazy, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { Pane } from 'split-pane-react';
import DataGrid from '~/base/components/Material/DataGrid';
import View from '~/base/components/Material/View';
import Section from '~/base/components/Material/View/Section';
import LayoutNotFound from '~/base/layout/NotFound';
import LayoutWrapper from '~/base/layout/Wrapper';
import KeyCode from '~/const/keycode';
import {
  getGroupAccountsDetail,
  saveAccountsChecked,
  saveAccountsPlanMapping
} from '~/main/features/account-settings/group-accounts/action';
import { groupAccountsAction } from '~/main/features/account-settings/group-accounts/slice';
import { SystemAccountResponse } from '~/main/features/account-settings/system-accounts/types';
import { useKeyPress } from '~/main/hooks/useKeyPress';
import usePromptNotSaved from '~/main/hooks/usePromptChanged';
import { useDispatchApp, useSelectorApp } from '~/redux/store';
import TopBar from './TopBar';
import { useColumns } from './common/columns';
import { QueryStringParams } from './common/params';
import { AccountsChangedType } from './common/types';
import { FormAction } from './components/FormAction';
import SplitPane from '~/base/components/SplitPane';

const AccountTree = lazy(() => import('./components/AccountTree'));
const GroupAccountsAllocationItems = lazy(() => import('./components/Drawer/AllocationItems'));

const GroupSettingsGroupsAccountsUpdateScreen = () => {
  const { t } = useTranslation();
  const isMd = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
  const { innerHeight: height } = window;

  const { publicId = '' } = useParams();
  const { pathname } = useLocation();

  const splitPaneRef = useRef<{ sizesPane: number[]; switchPane: (status?: 'open' | 'close') => void }>(null);
  const searchTreeFieldRef = useRef<HTMLInputElement | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const typeValue = searchParams.get('type') ?? '';
  const searchValue = searchParams.get('q') ?? '';

  const sizePane = searchParams.get('size-pane') || '';
  const filterAllAccounts = searchParams.get('filter-all-accounts') === 'true';

  const dispatch = useDispatchApp();
  const details = useSelectorApp((state) => state.accountSettings.groupAccounts.details);
  const { data: accounts = [], status, companyNo, companyName } = details[publicId] || {};

  const allocationItemsDrawer = useSelectorApp((state) => state.accountSettings.groupAccounts.allocationItemsDrawer);

  const [isLoaded, setIsLoaded] = useState(false);

  const [rowSelection, setRowSelection] = useState<GridRowSelectionModel>([]);
  const [accountChanged, setAccountChanged] = useState<AccountsChangedType>({});
  const [accountCheckedChanged, setAccountCheckedChanged] = useState<string[]>([]);

  const [visibleCreateDialog, setVisibleCreateDialog] = useState(false);
  const [visibleDeleteDialog, setVisibleDeleteDialog] = useState(false);

  const getData = useCallback(() => {
    dispatch(getGroupAccountsDetail({ publicId })).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch, publicId]);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    const selected = searchParams.get('selected') || '';
    if (selected) {
      setRowSelection([selected]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSaveAccountMapping = useCallback(() => {
    if (!Object.keys(accountChanged).length) {
      return;
    }

    const accountsMapping = {
      company_no: companyNo,
      company_accounting_plan_mapping: Object.values(accountChanged)
        .map(({ systemAccountNo, companyAccountNo }) => [
          { account_no: companyAccountNo, system_account_no: systemAccountNo }
        ])
        .flat()
    };

    return dispatch(saveAccountsPlanMapping(accountsMapping)).then((response) => {
      const payload = response.payload as AxiosResponse;
      if (!payload || payload?.data?.status === HttpStatusCode.NotFound) {
        throw new Error(t('app.system.error.internal-server'));
      }

      setAccountChanged({});
    });
  }, [accountChanged, companyNo, dispatch, t]);

  const onSaveAccountChecked = useCallback(() => {
    if (!accountCheckedChanged.length) {
      return;
    }

    return dispatch(saveAccountsChecked({ company_no: companyNo, id: accountCheckedChanged })).then((response) => {
      const payload = response.payload as AxiosResponse;
      if (!payload || payload?.data?.status === HttpStatusCode.NotFound) {
        throw new Error(t('app.system.error.internal-server'));
      }

      setAccountCheckedChanged([]);
    });
  }, [accountCheckedChanged, companyNo, dispatch, t]);

  const onSaveSubmit = useCallback(() => {
    if (!Object.keys(accountChanged).length && !accountCheckedChanged.length) {
      toast.error(t('app.system.saved.no-changed'));
      return;
    }

    toast.promise(
      Promise.all([onSaveAccountMapping(), onSaveAccountChecked()]).then(() => {
        getData();
      }),
      {
        loading: t('app.system.loading.saving'),
        success: t('app.system.saved.success'),
        error: (error) => `${error.message || error || t('app.system.error.message')}`
      }
    );
  }, [accountChanged, accountCheckedChanged.length, getData, onSaveAccountChecked, onSaveAccountMapping, t]);

  const onCellClick = useCallback(
    (params: GridCellParams) => {
      const { id: selected, field } = params;

      if (field === 'status' || field === 'totalItems') {
        return;
      }

      setRowSelection([selected]);

      if (selected) {
        searchParams.set('selected', `${selected}`);
      } else {
        searchParams.delete('selected');
      }

      searchParams.delete('search');
      setSearchParams(searchParams);

      if (searchTreeFieldRef.current) {
        searchTreeFieldRef.current.value = '';
      }

      if (typeValue === QueryStringParams.type.totalAccountUnMapped) {
        splitPaneRef?.current?.switchPane('open');
      }
    },
    [searchParams, setSearchParams, typeValue]
  );

  const onColumnChecked = useCallback((id: string, checked: boolean) => {
    if (checked) {
      setAccountCheckedChanged((ids) => [...ids, id]);
      return;
    }

    setAccountCheckedChanged((ids) => ids.filter((item) => item !== id));
  }, []);

  const accountSelected = useMemo(
    () => accounts.find((row) => rowSelection.includes(row.id)),
    [accounts, rowSelection]
  );

  const onAccountTreeSelectItems = useCallback(
    (account: SystemAccountResponse | null) => {
      if (!accountSelected) {
        return;
      }

      const { id: companyAccountId, accountNo: companyAccountNo } = accountSelected;

      if (!account) {
        dispatch(groupAccountsAction.setGroupDetailsByPublicId({ publicId, companyAccountId }));
        setAccountChanged((accounts) => ({
          ...accounts,
          [companyAccountId]: { systemAccountNo: '', companyAccountNo }
        }));
        return;
      }

      const { id: systemAccountId, accountNo: systemAccountNo } = account;
      dispatch(
        groupAccountsAction.setGroupDetailsByPublicId({
          publicId,
          systemAccountId,
          companyAccountId
        })
      );

      setAccountChanged((accounts) => ({
        ...accounts,
        [companyAccountId]: { systemAccountNo, companyAccountNo }
      }));
    },
    [accountSelected, dispatch, publicId]
  );

  const onCloseAllocationItemsDrawer = useCallback(
    () => dispatch(groupAccountsAction.setAllocationItemsDrawer(null)),
    [dispatch]
  );

  const columns = useColumns(t, {
    onChecked: onColumnChecked,
    hiddenChecked: typeValue === QueryStringParams.type.totalAccountUnMapped
  });

  const accountsRows = useMemo(() => {
    const search = searchValue.toLowerCase();

    return accounts.filter((account) => {
      let typeCondition = true;
      if (accountChanged[account.id]) {
        typeCondition = true;
      } else if (typeValue === QueryStringParams.type.totalAccountMapped) {
        typeCondition = account.systemAccountRef !== '';
      } else if (typeValue === QueryStringParams.type.totalAccountUnMapped) {
        typeCondition = account.systemAccountRef === '';
      }

      const accountName = account.accountName.toLowerCase();
      const accountNumber = account.accountNo.toLowerCase();
      const systemAccountName = account.systemAccountName.toLowerCase();
      const systemAccountNumber = account.systemAccountNo.toLowerCase();

      const searchCondition =
        accountName.includes(search) ||
        accountNumber.includes(search) ||
        systemAccountName.includes(search) ||
        systemAccountNumber.includes(search);

      const accountNameMatches = accountName.replace(/[^a-zA-Z0-9]/g, '');
      const systemAccountNameMatches = systemAccountName.replace(/[^a-zA-Z0-9]/g, '');

      const matchesLoadAll = filterAllAccounts || accountNameMatches !== systemAccountNameMatches;

      return typeCondition && searchCondition && matchesLoadAll;
    });
  }, [searchValue, accounts, accountChanged, typeValue, filterAllAccounts]);

  const wrapperParams = useMemo(() => {
    let typeTitle = '';
    if (typeValue === '' || typeValue === QueryStringParams.type.totalAccount) {
      typeTitle = t('app.breadcrumb.account-settings.group-accounts.total-accounts');
    } else if (typeValue === QueryStringParams.type.totalAccountMapped) {
      typeTitle = t('app.breadcrumb.account-settings.group-accounts.mapped-accounts');
    } else if (typeValue === QueryStringParams.type.totalAccountUnMapped) {
      typeTitle = t('app.breadcrumb.account-settings.group-accounts.un-mapped-accounts');
    }

    const companyTitle = `${companyNo || ''}${companyName ? ` - ${companyName}` : ''}`;

    return {
      title: `${companyTitle} | ${typeTitle} | ${t('app.title.allocation.items')}`,
      breadcrumbsLastItems: [
        { id: `account-settings.group-accounts.${publicId}`, path: pathname, title: companyTitle },
        { id: `account-settings.group-accounts.type.${typeValue}`, path: pathname, title: typeTitle }
      ]
    };
  }, [companyName, companyNo, pathname, publicId, t, typeValue]);

  useKeyPress([KeyCode.VALUE_F2, KeyCode.VALUE_F3, KeyCode.VALUE_F12], (event) => {
    event.preventDefault();

    if (event.key === KeyCode.VALUE_F2) {
      onSaveSubmit();
    }
    if (event.key === KeyCode.VALUE_F3) {
      setVisibleCreateDialog(!visibleCreateDialog);
    }
    if (event.key === KeyCode.VALUE_F12) {
      splitPaneRef?.current?.switchPane();
    }
  });

  usePromptNotSaved(Object.values(accountChanged).length > 0 || accountCheckedChanged.length > 0);

  if (isLoaded && !companyName) {
    return <LayoutNotFound />;
  }

  return (
    <LayoutWrapper
      title={wrapperParams.title}
      breadcrumbs={{
        title: t('app.breadcrumb.account-settings'),
        loading: status === 'loading',
        lastItems: wrapperParams.breadcrumbsLastItems,
        rightComponent: isLoaded ? <FormAction onSave={onSaveSubmit} /> : null
      }}
    >
      <View id='drawer-container' position='relative' p='20px' flexDirection='row' flexGrow={1}>
        {isMd && (
          <Section style={{ padding: 10 }} flexGrow={1}>
            <SplitPane
              ref={splitPaneRef}
              loading={isLoaded}
              initialSizesPane={[70, 30]}
              initialSizesPaneClose={[100, 0]}
            >
              <Pane minSize='40%' maxSize='80%' style={{ display: 'flex' }}>
                <Section flexGrow={1} gap={1}>
                  {isLoaded && (
                    <Fragment>
                      <TopBar />
                      <DataGrid
                        name='account-settings.group-accounts.update'
                        rows={accountsRows}
                        columns={columns}
                        getRowId={(row) => row.id}
                        loading={status === 'loading'}
                        initialState={{ sorting: { sortModel: [{ field: 'status', sort: 'asc' }] } }}
                        rowSelectionModel={rowSelection}
                        onCellClick={onCellClick}
                        disableRowSelectionOnClick
                      />
                    </Fragment>
                  )}
                  {!isLoaded && (
                    <View flexGrow={1} alignItems='center' justifyContent='center'>
                      <CircularProgress />
                    </View>
                  )}
                </Section>
              </Pane>
              <Pane minSize='20%' maxSize='80%' style={{ display: 'flex' }}>
                <Section flexGrow={1} gap={1}>
                  {(sizePane.split('-').map(Number)[1] || 0) !== 0 && (
                    <Suspense fallback={<LinearProgress />}>
                      <AccountTree
                        account={accountSelected}
                        onSelectItems={onAccountTreeSelectItems}
                        textFieldRef={searchTreeFieldRef}
                        visibleCreateDialog={visibleCreateDialog}
                        visibleDeleteDialog={visibleDeleteDialog}
                        onChangeVisibleCreateDialog={setVisibleCreateDialog}
                        onChangeVisibleDeleteDialog={setVisibleDeleteDialog}
                      />
                    </Suspense>
                  )}
                </Section>
              </Pane>
            </SplitPane>
          </Section>
        )}
        {!isMd && (
          <Grid container spacing={2}>
            <Grid item display='flex' xs={12}>
              <Section height={height / 1.5} flexGrow={1} gap={1}>
                <TopBar />
                <DataGrid
                  name='account-settings.group-accounts.update'
                  rows={accountsRows}
                  columns={columns}
                  getRowId={(row) => row.id}
                  loading={status === 'loading'}
                  initialState={{ sorting: { sortModel: [{ field: 'status', sort: 'asc' }] } }}
                  rowSelectionModel={rowSelection}
                  onCellClick={onCellClick}
                  disableRowSelectionOnClick
                />
              </Section>
            </Grid>
            <Grid item display='flex' xs={12}>
              <Section height={height / 1.5} flexGrow={1} gap={1}>
                <Suspense fallback={<LinearProgress />}>
                  <AccountTree
                    account={accountSelected}
                    onSelectItems={onAccountTreeSelectItems}
                    textFieldRef={searchTreeFieldRef}
                    visibleCreateDialog={visibleCreateDialog}
                    visibleDeleteDialog={visibleDeleteDialog}
                    onChangeVisibleCreateDialog={setVisibleCreateDialog}
                    onChangeVisibleDeleteDialog={setVisibleDeleteDialog}
                  />
                </Suspense>
              </Section>
            </Grid>
          </Grid>
        )}
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

export default GroupSettingsGroupsAccountsUpdateScreen;
