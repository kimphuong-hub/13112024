import { Box, CircularProgress } from '@mui/material';
import { FormikProps } from 'formik';
import { KeyboardEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';
import FontAwesomeIcon from '~/base/components/Icon/FontAwesome';
import Autocomplete from '~/base/components/Material/Form/Autocomplete';
import AutoCompleteTextField from '~/base/components/Material/Form/Autocomplete/TextField';
import { TypographySearch } from '~/base/components/Material/Typography';
import { isDev } from '~/core/config';
import { findSubtreeParentFirstById, flattenSubTree } from '~/core/tree/treeFuncs';
import { getSystemCompanyAccountsByCompanyNo } from '~/main/features/account-settings/system-accounts/action';
import { SystemCompanyAccountResponse } from '~/main/features/account-settings/system-accounts/types';
import { useDispatchApp, useSelectorApp } from '~/redux/store';
import { FormValues } from '../../common/form';

type Props = Omit<React.ComponentProps<typeof Autocomplete>, 'options' | 'renderInput'> & {
  formik: FormikProps<FormValues>;
};

const AccountSystemOptions = (props: Props) => {
  const { formik, style, ...restProps } = props;

  const { values, touched, errors } = formik;
  const { systemAccount = null } = values;

  const { companyNo = '' } = useParams();

  const dispatch = useDispatchApp();
  const { systemCompanyAccountOptions } = useSelectorApp((state) => state.allocation.items);
  const { data: options = [], status } = systemCompanyAccountOptions[companyNo] || {};

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [isConfirm, setIsConfirm] = useState(false);

  useEffect(() => {
    dispatch(getSystemCompanyAccountsByCompanyNo({ companyNo }));
  }, [companyNo, dispatch]);

  const onChange = useCallback(
    async (account: SystemCompanyAccountResponse) => {
      setOpen(false);

      if (account.isGroupAccount) {
        const systemAccount = findSubtreeParentFirstById(options, account.id);
        formik.setFieldValue('groupAccount', account);
        formik.setFieldValue('systemAccount', systemAccount);

        setIsConfirm(true);
      }

      if (!account.isGroupAccount) {
        formik.setFieldValue('systemAccount', account);

        setIsConfirm(true);
      }
    },
    [formik, options]
  );

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter') {
        if (isConfirm) {
          formik.submitForm();
          setIsConfirm(false);
          return;
        }
      }

      setOpen(true);
    },
    [formik, isConfirm]
  );

  const systemAccountOptionsProxy = useMemo(() => {
    const optionsItems = flattenSubTree(options);

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
        popupIndicator: {
          onClick: () => setOpen(!open)
        }
      }}
      getOptionLabel={(_option) => {
        const option = _option as SystemCompanyAccountResponse;
        return `${isDev ? `${option.id}` : ''}${option.accountNo ? `${isDev ? ` - ` : ''}${option.accountNo}` : ''}${option.accountName ? ` - ${option.accountName}` : ''}`;
      }}
      getOptionDisabled={(_option) => {
        const option = _option as SystemCompanyAccountResponse;
        return !option.isContainGroupAccount;
      }}
      isOptionEqualToValue={(_option, _value) => {
        const value = _value as SystemCompanyAccountResponse;
        const option = _option as SystemCompanyAccountResponse;
        return value.id === option.id;
      }}
      value={systemAccount}
      renderOption={(props, _option) => {
        const option = _option as SystemCompanyAccountResponse & { parents?: string };
        const parents = option.parents?.split('-')?.filter((parent) => parent) || [];
        return (
          <Box {...props} key={option.id} component='li'>
            {option.isGroupAccount && <FontAwesomeIcon icon='fa-solid fa-send' size={8} />}
            <TypographySearch
              ml={parents.length * 5}
              fontSize={13}
              text={`${isDev ? `${option.id}` : ''}${option.accountNo ? `${isDev ? ` - ` : ''}${option.accountNo}` : ''}${option.accountName ? ` - ${option.accountName}` : ''}`}
              search={search}
            />
          </Box>
        );
      }}
      options={systemAccountOptionsProxy}
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
