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
import { getGroupAccountsByCompanyNo } from '~/main/features/account-settings/group-accounts/action';
import { GroupAccountResponse } from '~/main/features/account-settings/group-accounts/types';
import { useDispatchApp, useSelectorApp } from '~/redux/store';
import { FormValues } from '../../../common/form';

type Props = Omit<React.ComponentProps<typeof Autocomplete>, 'options' | 'renderInput'>;

const AccountGroupOptions = (props: Props) => {
  const { style, ...restProps } = props;

  const { values, touched, errors, setFieldValue, submitForm } = useFormikContext<FormValues>();
  const { groupAccount = null } = values;

  const { companyNo = '' } = useParams();

  const systemAccount = values.systemAccount;

  const dispatch = useDispatchApp();
  const { groupAccountOptions } = useSelectorApp((state) => state.allocation.items);
  const { data: options = [], status } = groupAccountOptions[companyNo] || {};

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(getGroupAccountsByCompanyNo({ companyNo }));
  }, [companyNo, dispatch]);

  const onChange = useCallback(
    async (groupAccount: GroupAccountResponse) => {
      setOpen(false);

      setFieldValue('groupAccount', groupAccount);
      submitForm();
    },
    [setFieldValue, submitForm]
  );

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter') {
        submitForm();
      }

      setOpen(true);
    },
    [submitForm]
  );

  const getOptionLabel = useCallback((_option: unknown) => {
    const option = _option as GroupAccountResponse;
    return `${isDev ? `${option.id}` : ''}${option.accountNo ? `${isDev ? ` - ` : ''}${option.accountNo}` : ''}${option.accountName ? ` - ${option.accountName}` : ''}`;
  }, []);

  const getFilterOptions = useCallback(
    (_options: unknown[]) => {
      const options = _options as GroupAccountResponse[];
      return options.filter((item) => getOptionLabel(item).toLowerCase().includes(search));
    },
    [getOptionLabel, search]
  );

  const optionsProxy = useMemo(() => {
    if (!systemAccount) {
      return [];
    }

    // filter options by system id
    const optionsItems = options.filter((item) => item.systemAccountRef.includes(systemAccount.id));

    if (optionsItems.length > 0) {
      return optionsItems;
    }

    return [...(groupAccount ? [groupAccount] : [])];
  }, [groupAccount, options, systemAccount]);

  return (
    <Autocomplete
      style={{ width: '100%', ...style }}
      open={open}
      loading={status === 'loading'}
      onBlur={() => setOpen(false)}
      onClose={() => setSearch('')}
      onChange={(_, value) => onChange(value as GroupAccountResponse)}
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
            setTimeout(() => submitForm(), 100);
          }
        },
        popupIndicator: {
          onClick: () => setOpen(!open)
        }
      }}
      filterOptions={getFilterOptions}
      getOptionLabel={getOptionLabel}
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
