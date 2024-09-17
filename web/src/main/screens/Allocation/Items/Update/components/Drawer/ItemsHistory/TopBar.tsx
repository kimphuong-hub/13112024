import { useTheme } from '@mui/material';
import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useDebouncedCallback } from 'use-debounce';
import Filter from '~/base/components/Filter';
import FontAwesomeIcon from '~/base/components/Icon/FontAwesome';
import TextField from '~/base/components/Material/Form/TextField';
import Tooltip from '~/base/components/Material/Tooltip';
import Typography from '~/base/components/Material/Typography';
import View from '~/base/components/Material/View';
import { DEBOUNCE_SEARCH_TIMER } from '~/core/config/debounce';

type Props = {
  searchValue: string;
  setSearchValue: (value: string) => void;
};

const TopBar = (props: Props) => {
  const { searchValue, setSearchValue } = props;

  const theme = useTheme();
  const { t } = useTranslation();

  const onSearchModelChange = useDebouncedCallback((event) => {
    const searchValue = event.target.value.trim();
    setSearchValue(searchValue);
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
      </View>
    </View>
  );
};

export default TopBar;