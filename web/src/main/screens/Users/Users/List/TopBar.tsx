import { useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';
import FontAwesomeIcon from '~/base/components/Icon/FontAwesome';
import TextField from '~/base/components/Material/Form/TextField';
import Typography from '~/base/components/Material/Typography';
import View from '~/base/components/Material/View';
import Tooltip from '@mui/material/Tooltip';
import { DEBOUNCE_SEARCH_TIMER } from '~/core/config/debounce';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Filter from '~/base/components/Filter';

const TopBar = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const navigation = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const searchValue = searchParams.get('q') || '';

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

  const onNewUsers = useCallback(() => {
    navigation('/users/users/newusers');
  }, [navigation]);

  return (
    <View flexDirection='column' alignItems='flex-end' gap={1} width='100%'>
      <View flexDirection='row' alignItems='center' gap={1}>
        <Tooltip title={t('')}>
        <Filter.Button color='secondary' onClick={onNewUsers}
        >
            <Typography variant="body2" color={theme.palette.common.white}>
              {t('app.users.create-users.create.button')}
            </Typography>
            </Filter.Button>
            </Tooltip>
        <Tooltip title={t('')}>
          <Filter.Button color='secondary'>
            <FontAwesomeIcon icon='fa-solid fa-circle-question' size={15} color={theme.palette.common.white} />
          </Filter.Button>
        </Tooltip>
      </View>

      <View flexDirection='row' alignItems='center' gap={1} justifyContent='flex-start'>
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
      </View>
    </View>
  );
};

export default TopBar;
