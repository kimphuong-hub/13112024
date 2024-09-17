import { useTheme } from '@mui/material';
import { ChangeEvent, useCallback } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import Filter from '~/base/components/Filter';
import FontAwesomeIcon from '~/base/components/Icon/FontAwesome';
import TextField from '~/base/components/Material/Form/TextField';
import Tooltip from '~/base/components/Material/Tooltip';
import Typography from '~/base/components/Material/Typography';
import View from '~/base/components/Material/View';

type Props = {
  searchValue: string;
  onSearchValue?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

const TopBar = (props: Props) => {
  const { searchValue, onSearchValue } = props;

  const theme = useTheme();
  const { t } = useTranslation();

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
          onChange={onSearchValue}
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
