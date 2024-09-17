import { useTheme } from '@mui/material';
import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';
import Filter from '~/base/components/Filter';
import FontAwesomeIcon from '~/base/components/Icon/FontAwesome';
import TextField from '~/base/components/Material/Form/TextField';
import Tooltip from '~/base/components/Material/Tooltip';
import Typography from '~/base/components/Material/Typography';
import View from '~/base/components/Material/View';
import { DEBOUNCE_SEARCH_TIMER } from '~/core/config/debounce';

const TopBar = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();
  const searchValue = searchParams.get('q') ?? '';
  const filterAllAccounts = searchParams.get('filter-all-accounts') === 'true';

  const onFilterAllAccounts = useCallback(() => {
    if (filterAllAccounts) {
      searchParams.delete('filter-all-accounts');
      setSearchParams(searchParams);
      return;
    }

    searchParams.set('filter-all-accounts', 'true');
    setSearchParams(searchParams);
  }, [filterAllAccounts, searchParams, setSearchParams]);

  const onSearchModelChange = useDebouncedCallback((event) => {
    const searchValue = event.target.value.trim();

    if (searchValue) {
      searchParams.set('q', searchValue);
      setSearchParams(searchParams, { replace: true });
      return;
    }

    searchParams.delete('q');
    setSearchParams(searchParams, { replace: true });
  }, DEBOUNCE_SEARCH_TIMER);

  const onSearchCopyToClipboard = useCallback(() => {
    if (searchValue && navigator.clipboard) {
      navigator.clipboard.writeText(searchValue);
      toast.success(t('app.system.copied-to-clipboard'));
    }
  }, [searchValue, t]);

  return (
    <View flexDirection='row' justifyContent='flex-end'>
      <View flexDirection='row' alignItems='center' gap={1}>
        <FontAwesomeIcon icon='fa-solid fa-magnifying-glass' size={15} />
        <Typography>{t('app.input.search.label')}</Typography>
        <TextField
          size='small'
          variant='outlined'
          onChange={onSearchModelChange}
          defaultValue={searchValue}
          InputProps={{
            sx: {
              borderRadius: '1px',
              [theme.breakpoints.up('md')]: {
                minWidth: '400px'
              }
            },
            autoComplete: 'off'
          }}
        />
        <Tooltip title={t('app.system.copied-to-clipboard.tooltip')}>
          <Filter.Button color='secondary' onClick={onSearchCopyToClipboard}>
            <FontAwesomeIcon icon='fa-regular fa-copy' size={12} color={theme.palette.common.white} />
          </Filter.Button>
        </Tooltip>
        <Tooltip title={t('app.account-settings.global-accounts.toggle-filter-all-accounts')}>
          <Filter.Button color='secondary' onClick={onFilterAllAccounts}>
            <FontAwesomeIcon
              icon={`fa-regular fa-filter${filterAllAccounts ? '' : '-slash'}`}
              size={12}
              color={theme.palette.common.white}
            />
          </Filter.Button>
        </Tooltip>
      </View>
    </View>
  );
};

export default TopBar;
