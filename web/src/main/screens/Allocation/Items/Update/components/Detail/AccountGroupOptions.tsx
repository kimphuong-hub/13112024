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
import { GroupAccountResponse } from '~/main/features/account-settings/group-accounts/types';
import { useDispatchApp, useSelectorApp } from '~/redux/store';
import { FormValues } from '../../common/form';
import { getGroupAccountsByCompanyNo } from '~/main/features/account-settings/group-accounts/action';

type Props = Omit<React.ComponentProps<typeof Autocomplete>, 'options' | 'renderInput'> & {
  formik: FormikProps<FormValues>;
  open: boolean;
  inputRef: MutableRefObject<HTMLInputElement | undefined>;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  onChangeOpen: (open: boolean) => void;
  onChangeValue: (account: GroupAccountResponse) => void;
};

const AccountGroupOptions = (props: Props) => {
  const { formik, open, inputRef, onKeyDown, onChangeOpen, onChangeValue, style, ...restProps } = props;

  const { values, touched, errors } = formik;
  const { groupAccount = null } = values;

  const { companyNo = '' } = useParams();

  const systemAccount = formik.values.systemAccount;

  const dispatch = useDispatchApp();
  const { groupAccountOptions } = useSelectorApp((state) => state.allocation.items);
  const { data: options = [], status } = groupAccountOptions[companyNo] || {};

  const [groupAccountSearch, setGroupAccountSearch] = useState('');

  useEffect(() => {
    dispatch(getGroupAccountsByCompanyNo({ companyNo }));
  }, [companyNo, dispatch]);

  const groupAccountOptionsProxy = useMemo(() => {
    let optionsItems = options;

    if (!systemAccount?.id) {
      return optionsItems;
    }

    // filter options by system id
    optionsItems = options.filter((item) => `${item.systemAccountRef}`.includes(`${systemAccount?.id}`));

    if (optionsItems.length > 0) {
      return optionsItems;
    }

    return [...(groupAccount ? [groupAccount] : [])];
  }, [groupAccount, options, systemAccount?.id]);

  return (
    <Autocomplete
      style={{ width: '100%', ...style }}
      open={open}
      loading={status === 'loading'}
      onBlur={() => onChangeOpen(false)}
      onClose={() => setGroupAccountSearch('')}
      onChange={(_, value) => onChangeValue(value as GroupAccountResponse)}
      onInputChange={(_, value) => setGroupAccountSearch(value)}
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
        const option = _option as GroupAccountResponse;
        return `${isDev ? `${option.id}` : ''}${option.accountNo ? `${isDev ? ` - ` : ''}${option.accountNo}` : ''}${option.accountName ? ` - ${option.accountName}` : ''}`;
      }}
      isOptionEqualToValue={(_option, _value) => {
        const value = _value as GroupAccountResponse;
        const option = _option as GroupAccountResponse;
        return value.id === option.id;
      }}
      value={groupAccount}
      renderOption={(props, _option) => {
        const option = _option as GroupAccountResponse;
        return (
          <Box {...props} key={option.id} component='li'>
            <TypographySearch
              fontSize={13}
              text={`${isDev ? `${option.id}` : ''}${option.accountNo ? `${isDev ? ` - ` : ''}${option.accountNo}` : ''}${option.accountName ? ` - ${option.accountName}` : ''}`}
              search={groupAccountSearch}
            />
          </Box>
        );
      }}
      options={groupAccountOptionsProxy}
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
          error={touched.groupAccount && Boolean(errors.groupAccount)}
          helperText={touched.groupAccount && errors.groupAccount}
          onKeyDown={onKeyDown}
        />
      )}
      {...restProps}
    />
  );
};

export default AccountGroupOptions;
