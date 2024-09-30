import { Box, CircularProgress } from '@mui/material';
import { useFormikContext } from 'formik';
import { KeyboardEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';
import FontAwesomeIcon from '~/base/components/Icon/FontAwesome';
import Autocomplete from '~/base/components/Material/Form/Autocomplete';
import AutoCompleteTextField from '~/base/components/Material/Form/Autocomplete/TextField';
import { TypographySearch } from '~/base/components/Material/Typography';
import { isDev } from '~/core/config';
import { findSubtreeById, findSubtreeParentFirstById, flattenSubTree } from '~/core/tree/treeFuncs';
import { getSystemCompanyAccountsByCompanyNo } from '~/main/features/account-settings/system-accounts/action';
import { SystemCompanyAccountResponse } from '~/main/features/account-settings/system-accounts/types';
import { useDispatchApp, useSelectorApp } from '~/redux/store';
import { FormValues } from '../../../common/form';

type Props = Omit<React.ComponentProps<typeof Autocomplete>, 'options' | 'renderInput'> & {
  onNextItem: () => void;
};

const AccountSystemOptions = (props: Props) => {
  const { style, onNextItem, ...restProps } = props;

  const { values, touched, errors, setFieldValue, submitForm } = useFormikContext<FormValues>();
  const { systemAccount = null } = values;

  const { companyNo = '' } = useParams();

  const dispatch = useDispatchApp();
  const { systemCompanyAccountOptions } = useSelectorApp((state) => state.allocation.items);
  const { data: options = [], status } = systemCompanyAccountOptions[companyNo] || {};

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(getSystemCompanyAccountsByCompanyNo({ companyNo }));
  }, [companyNo, dispatch]);

  const onChange = useCallback(
    async (account: SystemCompanyAccountResponse) => {
      setOpen(false);

      if (account?.isGroupAccount) {
        const systemAccount = findSubtreeParentFirstById(options, account.id);
        setFieldValue('groupAccount', account);
        setFieldValue('systemAccount', systemAccount);
      } else {
        const systemAccounts: SystemCompanyAccountResponse = findSubtreeById(options, account.id);
        if (systemAccounts && systemAccounts.countGroupAccounts === 1) {
          const groupAccount = systemAccounts.children.find((item) => item.isGroupAccount);
          setFieldValue('groupAccount', groupAccount);
          setFieldValue('systemAccount', { ...account, accountName: systemAccounts.accountName });
        }
      }

      // submit after 100ms
      setTimeout(() => submitForm(), 100);
    },
    [options, setFieldValue, submitForm]
  );

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter') {
        if (!search) {
          setOpen(true);
          return;
        }

        if (systemAccount) {
          submitForm();
          onNextItem();
          return;
        }
      }

      setOpen(true);
    },
    [onNextItem, search, submitForm, systemAccount]
  );

  const getOptionLabel = useCallback((_option: unknown) => {
    const option = _option as SystemCompanyAccountResponse;
    return `${isDev ? `${option.id}` : ''}${option.accountNo ? `${isDev ? ` - ` : ''}${option.accountNo}` : ''}${option.accountName ? ` - ${option.accountName}` : ''}`;
  }, []);

  const getFilterOptions = useCallback(
    (_options: unknown[]) => {
      const options = _options as (SystemCompanyAccountResponse & { parentIds: string[]; childrenIds: string[] })[];
      const searchOptions = options.filter((item) => getOptionLabel(item).toLowerCase().includes(search));
      const searchOptionsIds = searchOptions.map((item) => item.id);
      const referenceOptionsIds = searchOptions.map((item) => [...item.parentIds, ...item.childrenIds]).flat();
      return options.filter((item) => [...new Set([...searchOptionsIds, ...referenceOptionsIds])].includes(item.id));
    },
    [getOptionLabel, search]
  );

  const mappingSubTreeOptions = (options: SystemCompanyAccountResponse[]): SystemCompanyAccountResponse[] => {
    const mappingSubTree = (options: SystemCompanyAccountResponse[]): SystemCompanyAccountResponse[] =>
      options.map((option) => {
        if (option.countGroupAccounts === 1) {
          const groupAccount = option.children.find((item) => item.isGroupAccount);
          return {
            ...option,
            children: mappingSubTree(option.children.filter((item) => !item.isGroupAccount)),
            accountName: `${option.accountName}${groupAccount ? ` ⮕ ${groupAccount.accountName}` : ''}`
          };
        }

        return { ...option, children: mappingSubTree(option.children) };
      });

    return mappingSubTree(options);
  };

  const optionsProxy = useMemo(() => {
    const optionsItems = flattenSubTree(mappingSubTreeOptions(options));

    if (optionsItems.length > 0) {
      return optionsItems;
    }

    return [...(systemAccount ? [systemAccount] : [])];
  }, [systemAccount, options]);

  return (
    <Autocomplete
      style={{ width: '100%', ...style }}
      open={open}
      loading={status === 'loading'}
      onBlur={() => setOpen(false)}
      onClose={() => setSearch('')}
      onChange={(_, value) => onChange(value as SystemCompanyAccountResponse)}
      onInputChange={(_, value) => setSearch(value)}
      popupIcon={
        <FontAwesomeIcon
          icon={open ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-down'}
          size={10}
          padding='5px 7px'
          marginTop={open ? '-2px' : 0}
        />
      }
      clearIcon={<FontAwesomeIcon icon='fa-solid fa-xmark' size={10} padding='5px 7px' />}
      slotProps={{
        clearIndicator: {
          onClick: () => {
            setFieldValue('groupAccount', null);
            setFieldValue('systemAccount', null);
            setTimeout(() => submitForm(), 100);
          }
        },
        popupIndicator: {
          onClick: () => setOpen(!open)
        }
      }}
      filterOptions={getFilterOptions}
      getOptionLabel={getOptionLabel}
      getOptionDisabled={(_option) => {
        const option = _option as SystemCompanyAccountResponse;
        return option.countGroupAccounts > 1;
      }}
      isOptionEqualToValue={(_option, _value) => {
        const value = _value as SystemCompanyAccountResponse;
        const option = _option as SystemCompanyAccountResponse;
        return value.id === option.id;
      }}
      value={systemAccount}
      renderOption={(props, _option) => {
        const option = _option as SystemCompanyAccountResponse & { parentIds: string[] };
        const parents = option.parentIds;
        return (
          <Box {...props} key={option.id} ml={parents.length * 3} component='li' gap={2}>
            {(option.isGroupAccount || option.countGroupAccounts === 1) && (
              <FontAwesomeIcon icon='fa-solid fa-send' size={8} />
            )}
            <TypographySearch fontSize={13} text={getOptionLabel(_option)} search={search} />
          </Box>
        );
      }}
      options={optionsProxy}
      renderInput={(params) => (
        <AutoCompleteTextField
          {...params}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <Fragment>
                {status === 'loading' && <CircularProgress color='inherit' size={15} />}
                {params.InputProps.endAdornment}
              </Fragment>
            )
          }}
          error={touched.systemAccount && Boolean(errors.systemAccount)}
          helperText={touched.systemAccount && errors.systemAccount}
          onKeyDown={onKeyDown}
        />
      )}
      {...restProps}
    />
  );
};

export default AccountSystemOptions;
