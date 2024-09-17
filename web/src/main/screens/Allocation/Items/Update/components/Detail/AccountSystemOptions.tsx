import { Box, CircularProgress } from '@mui/material';
import { FormikProps } from 'formik';
import { KeyboardEvent, MutableRefObject, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';
import FontAwesomeIcon from '~/base/components/Icon/FontAwesome';
import Autocomplete from '~/base/components/Material/Form/Autocomplete';
import AutoCompleteTextField from '~/base/components/Material/Form/Autocomplete/TextField';
import { TypographySearch } from '~/base/components/Material/Typography';
import { isDev } from '~/core/config';
import { flattenSubTree } from '~/core/tree/treeFuncs';
import { SystemAccountResponse } from '~/main/features/account-settings/system-accounts/types';
import { useDispatchApp, useSelectorApp } from '~/redux/store';
import { FormValues } from '../../common/form';
import { getSystemAccountsByCompanyNo } from '~/main/features/account-settings/system-accounts/action';

type Props = Omit<React.ComponentProps<typeof Autocomplete>, 'options' | 'renderInput'> & {
  formik: FormikProps<FormValues>;
  open: boolean;
  inputRef: MutableRefObject<HTMLInputElement | undefined>;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  onChangeOpen: (open: boolean) => void;
  onChangeValue: (account: SystemAccountResponse) => void;
};

const AccountSystemOptions = (props: Props) => {
  const { formik, open, inputRef, onKeyDown, onChangeOpen, onChangeValue, style, ...restProps } = props;

  const { values, touched, errors } = formik;
  const { systemAccount = null } = values;

  const { companyNo = '' } = useParams();

  const dispatch = useDispatchApp();
  const { systemAccountOptions } = useSelectorApp((state) => state.allocation.items);
  const { data: options = [], status } = systemAccountOptions[companyNo] || {};

  const [systemAccountSearch, setSystemAccountSearch] = useState('');

  useEffect(() => {
    dispatch(getSystemAccountsByCompanyNo({ companyNo }));
  }, [companyNo, dispatch]);

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
      onBlur={() => onChangeOpen(false)}
      onClose={() => setSystemAccountSearch('')}
      onChange={(_, value) => onChangeValue(value as SystemAccountResponse)}
      onInputChange={(_, value) => setSystemAccountSearch(value)}
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
          onClick: () => onChangeOpen(!open)
        }
      }}
      getOptionLabel={(_option) => {
        const option = _option as SystemAccountResponse;
        return `${isDev ? `${option.id}` : ''}${option.accountNo ? `${isDev ? ` - ` : ''}${option.accountNo}` : ''}${option.accountName ? ` - ${option.accountName}` : ''}`;
      }}
      isOptionEqualToValue={(_option, _value) => {
        const value = _value as SystemAccountResponse;
        const option = _option as SystemAccountResponse;
        return value.id === option.id;
      }}
      value={systemAccount}
      renderOption={(props, _option) => {
        const option = _option as SystemAccountResponse & { parents?: string };
        const parents = option.parents?.split('-')?.filter((parent) => parent) || [];
        return (
          <Box {...props} key={option.id} component='li'>
            <TypographySearch
              ml={parents.length * 5}
              fontSize={13}
              text={`${isDev ? `${option.id}` : ''}${option.accountNo ? `${isDev ? ` - ` : ''}${option.accountNo}` : ''}${option.accountName ? ` - ${option.accountName}` : ''}`}
              search={systemAccountSearch}
            />
          </Box>
        );
      }}
      options={systemAccountOptionsProxy}
      renderInput={(params) => (
        <AutoCompleteTextField
          {...params}
          inputRef={inputRef}
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
