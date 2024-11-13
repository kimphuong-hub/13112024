import { useTheme } from '@mui/material';
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
  const searchValue = searchParams.get('search') || '';

  const onSearchModelChange = useDebouncedCallback((event) => {
    const searchValue = event.target.value.trim();

    if (searchValue) {
      searchParams.set('search', searchValue);
      setSearchParams(searchParams, { replace: true });
      return;
    }

    searchParams.delete('search');
    setSearchParams(searchParams, { replace: true });
  }, DEBOUNCE_SEARCH_TIMER);

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
          <Filter.Button color='secondary'>
            <FontAwesomeIcon icon='fa-regular fa-copy' size={12} color={theme.palette.common.white} />
          </Filter.Button>
        </Tooltip>
      </View>
    </View>
  );
};

export default TopBar;
