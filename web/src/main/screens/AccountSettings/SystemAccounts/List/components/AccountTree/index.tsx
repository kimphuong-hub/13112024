import { LinearProgress, useTheme } from '@mui/material';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';
import Filter from '~/base/components/Filter';
import FontAwesomeIcon from '~/base/components/Icon/FontAwesome';
import Button from '~/base/components/Material/Button';
import TextField from '~/base/components/Material/Form/TextField';
import RichTreeView from '~/base/components/Material/RichTreeView';
import Tooltip from '~/base/components/Material/Tooltip';
import Typography from '~/base/components/Material/Typography';
import View from '~/base/components/Material/View';
import { isDev } from '~/core/config';
import { DEBOUNCE_SEARCH_TIMER } from '~/core/config/debounce';
import { findSubtreeById, getAllIdsSubTree } from '~/core/tree/treeFuncs';
import { RichTreeItemsType } from '~/core/types';
import { getSystemAccounts } from '~/main/features/account-settings/system-accounts/action';
import {
  SystemAccountDetailResponse,
  SystemAccountResponse
} from '~/main/features/account-settings/system-accounts/types';
import { useDispatchApp, useSelectorApp } from '~/redux/store';
import SystemAccountsCreateDialog from '../../../Create';
import SystemAccountsDeleteDialog from '../../../Delete';
import { TreeItemSearch } from './TreeItemSearch';

type Props = {
  account?: SystemAccountDetailResponse;
  onSelectItems: (account: SystemAccountResponse | null) => void;
  visibleCreateDialog: boolean;
  onChangeVisibleCreateDialog: (visible: boolean) => void;
  visibleDeleteDialog: boolean;
  onChangeVisibleDeleteDialog: (visible: boolean) => void;
};

const MAX_RESULTS_EXPANDED = 15;

const AccountTree = (props: Props) => {
  const {
    account,
    onSelectItems,
    visibleCreateDialog,
    visibleDeleteDialog,
    onChangeVisibleCreateDialog,
    onChangeVisibleDeleteDialog
  } = props;

  const theme = useTheme();
  const { t } = useTranslation();

  const viewRef = useRef<HTMLDivElement | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const loadAll = searchParams.get('load-all') === 'true';
  const selected = searchParams.get('selected') || '';
  const searchValue = searchParams.get('q') || '';

  const dispatch = useDispatchApp();
  const { data: accounts, status } = useSelectorApp((state) => state.accountSettings.systemAccounts.system);

  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const getData = useCallback(() => {
    dispatch(getSystemAccounts());
  }, [dispatch]);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    if (account) {
      return;
    }

    const accountSelected = findSubtreeById(accounts, selected);
    if (accountSelected) {
      onSelectItems(accountSelected);
      setSelectedItems([selected]);
    }
  }, [account, accounts, onSelectItems, selected]);

  const onSearchModelChange = useDebouncedCallback((event) => {
    setExpandedItems([]);
    const searchValue = event.target.value.trim();

    if (searchValue) {
      searchParams.set('q', searchValue);
      setSearchParams(searchParams);
      return;
    }

    searchParams.delete('q');
    setSearchParams(searchParams);
  }, DEBOUNCE_SEARCH_TIMER);

  const onLoadAllItems = useCallback(() => {
    if (loadAll) {
      searchParams.delete('load-all');
      setSearchParams(searchParams);
      return;
    }

    searchParams.set('load-all', 'true');
    setSearchParams(searchParams);
  }, [loadAll, searchParams, setSearchParams]);

  const selectedAccount = useMemo(() => account?.systemAccountRef, [account?.systemAccountRef]);

  const filterAccounts = useCallback(
    (accounts: SystemAccountResponse[]): RichTreeItemsType[] => {
      const searchWords = searchValue
        .toLowerCase()
        .split(/\s+/)
        .filter((word) => word);

      const newAccounts = accounts.map((account) => {
        const filtered = filterAccounts(account.children || []);

        const accountNo = account.accountNo.toLowerCase();
        const accountName = account.accountName.toLowerCase();
        const matchesSearch = searchWords.every(
          (search) =>
            accountNo.includes(search) ||
            accountName.includes(search) ||
            (isDev ? `${account.id}`.includes(search) : false)
        );
        const matchesLoadAll = loadAll || account.isDefault || searchWords.length > 0;
        const matchesSelected = selectedAccount ? account.id === selectedAccount : account.id === selected;

        if (matchesSelected || (matchesSearch && matchesLoadAll) || filtered.length > 0) {
          return {
            id: `${account.id}`,
            label: `${isDev ? `${account.id} - ` : ''}${isDev ? `${account.isDefault} - ` : ''}${account.accountNo} - ${account.accountName}`,
            children: filtered
          };
        }

        return null;
      });

      return (newAccounts.filter((item) => item !== null) || []) as RichTreeItemsType[];
    },
    [loadAll, searchValue, selected, selectedAccount]
  );

  const filterExpanded = useCallback(
    (accounts: RichTreeItemsType[], index = 0): RichTreeItemsType[] => {
      if (searchValue && accounts.length < MAX_RESULTS_EXPANDED) {
        return accounts;
      }

      return accounts
        .map((account) => {
          if (expandedItems.includes(account.id)) {
            return { ...account, children: filterExpanded(account.children || [], 0) };
          }

          if (index === 0) {
            return { ...account, children: filterExpanded(account.children || [], index + 1) };
          } else if (index === 1) {
            return { ...account, children: [] };
          }

          return null;
        })
        .filter((item) => item !== null) as RichTreeItemsType[];
    },
    [expandedItems, searchValue]
  );

  const onSelectedItemsChangeEdit = useCallback(
    (_event: React.SyntheticEvent, itemIds: string | string[] | null) => {
      if (typeof itemIds === 'string') {
        const account = findSubtreeById(accounts, itemIds);

        if (account) {
          onSelectItems(account);
          setSelectedItems([itemIds]);
        }
      }
    },
    [accounts, onSelectItems]
  );

  const onSelectedItemsChange = useCallback(
    (_event: React.SyntheticEvent, itemIds: string | string[] | null) => {
      if (account) {
        onSelectedItemsChangeEdit(_event, itemIds);
        return;
      }

      if (!itemIds) {
        onSelectItems(null);
        setSelectedItems([]);

        searchParams.delete('selected');
        setSearchParams(searchParams);
        return;
      }

      if (typeof itemIds === 'string') {
        const account = findSubtreeById(accounts, itemIds);
        if (account) {
          onSelectItems(account);
          setSelectedItems([itemIds]);

          searchParams.set('selected', account.id);
          setSearchParams(searchParams);
        }
        return;
      }
    },
    [account, accounts, onSelectItems, onSelectedItemsChangeEdit, searchParams, setSearchParams]
  );

  const accountsData = useMemo(
    () => filterExpanded(filterAccounts(accounts)),
    [filterExpanded, filterAccounts, accounts]
  );

  const selectedItemsProxy = useMemo(() => {
    if (selectedAccount) {
      return selectedAccount;
    }

    return selectedItems;
  }, [selectedAccount, selectedItems]);

  const expandedItemsProxy = useMemo(() => {
    if (expandedItems.length) {
      return expandedItems;
    }

    if (searchValue && accountsData.length < MAX_RESULTS_EXPANDED) {
      return getAllIdsSubTree(accountsData);
    }

    return [];
  }, [accountsData, expandedItems, searchValue]);

  const treeSelectedAccount = useMemo(() => {
    if (typeof selectedItemsProxy === 'string') {
      return findSubtreeById(accounts, selectedItemsProxy);
    }
    if (Array.isArray(selectedItemsProxy)) {
      return findSubtreeById(accounts, selectedItemsProxy[0]);
    }
    return null;
  }, [accounts, selectedItemsProxy]);

  return (
    <View flexGrow={1} gap={2}>
      <View gap={2}>
        {account && (
          <View flexWrap='wrap' flexDirection='row' justifyContent='space-between' alignItems='center' columnGap={5}>
            <Typography fontSize={18}>{account.accountName}</Typography>
            <Typography fontSize={18}>{account.accountNo}</Typography>
          </View>
        )}
        <View flexDirection='row' alignItems='center' gap={3}>
          <View flexDirection='row' alignItems='center' gap={1}>
            <Tooltip title={t('app.system.create.tooltip')}>
              <span>
                <Button
                  variant='contained'
                  style={{ padding: '9px 11px' }}
                  onClick={() => onChangeVisibleCreateDialog(true)}
                >
                  <FontAwesomeIcon icon='fa-regular fa-plus' size={12} color={theme.palette.common.white} />
                </Button>
              </span>
            </Tooltip>
            <Tooltip title={t('app.system.delete.tooltip')}>
              <span>
                <Button
                  color='error'
                  variant='contained'
                  style={{ padding: '9px 11px' }}
                  onClick={() => onChangeVisibleDeleteDialog(true)}
                  disabled={!!account || !treeSelectedAccount}
                >
                  <FontAwesomeIcon icon='fa-regular fa-minus' size={12} color={theme.palette.common.white} />
                </Button>
              </span>
            </Tooltip>
          </View>
          <View flexGrow={1} flexDirection='row' alignItems='center' gap={1}>
            <FontAwesomeIcon icon='fa-solid fa-magnifying-glass' size={15} />
            <Typography>{t('app.input.search.label')}</Typography>
            <TextField
              size='small'
              variant='outlined'
              onChange={onSearchModelChange}
              defaultValue={searchValue}
              InputProps={{ style: { borderRadius: '1px' } }}
            />
            <Tooltip title={t('app.account-settings.global-accounts.toggle-all-accounts')}>
              <Filter.Button color='secondary' onClick={onLoadAllItems}>
                <FontAwesomeIcon
                  icon={`fa-regular fa-filter${loadAll ? '' : '-slash'}`}
                  size={12}
                  color={theme.palette.common.white}
                />
              </Filter.Button>
            </Tooltip>
          </View>
        </View>
        {status === 'loading' && <LinearProgress />}
      </View>
      <View ref={viewRef} flexGrow={1} gap={2}>
        <View flexGrow={1} style={{ height: (viewRef.current?.clientHeight || 200) - 100 }} overflow='auto' gap={2}>
          <RichTreeView
            slots={{ item: TreeItemSearch }}
            items={accountsData}
            selectedItems={selectedItemsProxy}
            expandedItems={expandedItemsProxy}
            onSelectedItemsChange={onSelectedItemsChange}
            onExpandedItemsChange={(_, itemIds: string[]) => setExpandedItems(itemIds)}
            checkboxSelection
          />
          {status !== 'loading' && accountsData.length === 0 && (
            <View height='100%' justifyContent='center' alignItems='center'>
              <Typography style={{ fontSize: '0.875rem' }}>{t('app.system.grid.no-rows')}</Typography>
            </View>
          )}
        </View>
      </View>
      <SystemAccountsCreateDialog
        open={visibleCreateDialog}
        onClose={() => onChangeVisibleCreateDialog(false)}
        account={treeSelectedAccount}
        onRefresh={() => getData()}
      />
      {treeSelectedAccount && (
        <SystemAccountsDeleteDialog
          open={visibleDeleteDialog}
          onClose={() => onChangeVisibleDeleteDialog(false)}
          account={treeSelectedAccount}
          onRefresh={() => getData()}
        />
      )}
    </View>
  );
};

export default memo(AccountTree);
