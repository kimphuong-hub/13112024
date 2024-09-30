import { Box, Collapse, Divider } from '@mui/material';
import dayjs from 'dayjs';
import moment from 'moment';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import Filter from '~/base/components/Filter';
import Chip from '~/base/components/Material/Chip';
import Autocomplete from '~/base/components/Material/Form/Autocomplete';
import AutoCompleteTextField from '~/base/components/Material/Form/Autocomplete/TextField';
import DatePicker from '~/base/components/Material/Form/DatePicker';
import Label from '~/base/components/Material/Form/Label';
import { TypographySearch } from '~/base/components/Material/Typography';
import View from '~/base/components/Material/View';
import { useDispatchApp, useSelectorApp } from '~/redux/store';
import FontAwesomeIcon from '~/base/components/Icon/FontAwesome';
import { getGroupsAll } from '~/main/features/account-settings/group-accounts/action';
import { GroupAllResponse } from '~/main/features/account-settings/group-accounts/types';

type Props = {
  open: boolean;
  onClose: () => void;
};

export const FormFilter = (props: Props) => {
  const { open, onClose } = props;
  const { t } = useTranslation();

  const dispatch = useDispatchApp();
  const { data: groupsSelector } = useSelectorApp((state) => state.accountSettings.groupAccounts.groupsSelector);

  const [searchParams, setSearchParams] = useSearchParams();
  const groupParam = searchParams.get('group') || '0';
  const toDateParam = searchParams.get('to-date') || moment().format('YYYY-MM-DD');
  const fromDateParam = searchParams.get('from-date') || moment().day(-7).format('YYYY-MM-DD');

  const [group, setGroup] = useState(groupParam);
  const [toDate, setToDate] = useState(toDateParam);
  const [fromDate, setFromDate] = useState(fromDateParam);

  const [groupSearch, setGroupSearch] = useState('');

  useEffect(() => {
    dispatch(getGroupsAll());
  }, [dispatch]);

  const onSetSearchParams = useCallback(
    (name: string, value: string) => {
      searchParams.set(name, value);
      setSearchParams(searchParams, { replace: true });
    },
    [searchParams, setSearchParams]
  );

  const onDeleteSearchParams = useCallback(
    (name: string) => {
      searchParams.delete(name);
      setSearchParams(searchParams, { replace: true });
    },
    [searchParams, setSearchParams]
  );

  const onApply = useCallback(() => {
    onClose();
    onSetSearchParams('group', group);
    onSetSearchParams('to-date', toDate);
    onSetSearchParams('from-date', fromDate);
  }, [fromDate, group, onClose, onSetSearchParams, toDate]);

  const onReset = useCallback(() => {
    onClose();

    setGroup('0');
    setToDate(moment().format('YYYY-MM-DD'));
    setFromDate(moment().day(-7).format('YYYY-MM-DD'));

    onDeleteSearchParams('group');
    onDeleteSearchParams('to-date');
    onDeleteSearchParams('from-date');
  }, [onClose, onDeleteSearchParams]);

  const onRemoveFilter = useCallback(
    (name: string) => {
      if (name === 'group') {
        setGroup('0');
        onDeleteSearchParams('group');
      }
    },
    [onDeleteSearchParams]
  );

  const groupSelected = useMemo(
    () => groupsSelector.find((groupSelector) => groupSelector.companyNo === group),
    [group, groupsSelector]
  );

  return (
    <View>
      <View gap={1}>
        <Divider />
        <Collapse in={!open}>
          <View flexDirection='row' gap={1}>
            {group !== '0' && (
              <Chip
                label={`${t('app.allocation.archives.filter.groups')}: ${group}`}
                size='small'
                onDelete={() => onRemoveFilter('group')}
              />
            )}
            <Chip
              label={`${t('app.allocation.archives.filter.date-range')}: ${moment(fromDate).format('DD-MM-YY')} ⮕ ${moment(toDate).format('DD-MM-YY')}`}
              size='small'
            />
          </View>
        </Collapse>
      </View>
      <Collapse in={open}>
        <View gap={1}>
          <View p='10px' flexDirection='row' gap={2}>
            <View width='30%'>
              <Label>{t('app.allocation.archives.filter.groups')}:</Label>
              <Autocomplete
                onClose={() => setGroupSearch('')}
                onChange={(_, _value) => {
                  const value = _value as GroupAllResponse;
                  setGroup(value?.companyNo || '0');
                }}
                onInputChange={(_, value) => setGroupSearch(value)}
                clearIcon={
                  <FontAwesomeIcon icon='fa-solid fa-xmark' size={10} padding='5px 7px' onClick={() => setGroup('0')} />
                }
                getOptionLabel={(_option) => {
                  const option = _option as GroupAllResponse;
                  return `${option.companyNo} - ${option.name}`;
                }}
                isOptionEqualToValue={(_option, _value) => {
                  const value = _value as GroupAllResponse;
                  const option = _option as GroupAllResponse;
                  return value.id === option.id;
                }}
                value={groupSelected}
                options={groupsSelector}
                renderInput={(params) => <AutoCompleteTextField {...params} />}
                renderOption={(props, _option) => {
                  const option = _option as GroupAllResponse;
                  return (
                    <Box {...props} key={option.id} component='li'>
                      <TypographySearch
                        fontSize={13}
                        text={`${option.companyNo} - ${option.name}`}
                        search={groupSearch}
                      />
                    </Box>
                  );
                }}
              />
            </View>
            <View>
              <Label>{t('app.allocation.archives.filter.date-range')}:</Label>
              <View flexDirection='row' gap={1}>
                <DatePicker
                  value={dayjs(fromDate)}
                  format='DD/MM/YYYY'
                  onChange={(value) => setFromDate(moment(value?.toString()).format('YYYY-MM-DD'))}
                />
                <DatePicker
                  value={dayjs(toDate)}
                  format='DD/MM/YYYY'
                  onChange={(value) => setToDate(moment(value?.toString()).format('YYYY-MM-DD'))}
                />
              </View>
            </View>
          </View>
          <Divider />
          <View flexDirection='row' justifyContent='end' gap={1}>
            <Filter.Button size='small' onClick={onApply}>
              Apply
            </Filter.Button>
            <Filter.Button size='small' color='secondary' onClick={onReset}>
              Reset
            </Filter.Button>
          </View>
        </View>
      </Collapse>
    </View>
  );
};
