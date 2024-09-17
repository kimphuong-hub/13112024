import { inputBaseClasses, outlinedInputClasses, styled, svgIconClasses } from '@mui/material';
import MuiAutocomplete from '@mui/material/Autocomplete';
import Typography from '../../Typography';
import { useTranslation } from 'react-i18next';
import { Ref, forwardRef } from 'react';

const AutoCompleteRef = (props: React.ComponentProps<typeof MuiAutocomplete>, ref: Ref<unknown>) => {
  const { t } = useTranslation();

  return (
    <MuiAutocomplete
      ref={ref}
      style={{ flexGrow: 1 }}
      size='small'
      loadingText={<Typography fontSize={13}>{t('app.autocomplete.loading')}</Typography>}
      noOptionsText={<Typography fontSize={13}>{t('app.autocomplete.no-options')}</Typography>}
      {...props}
    />
  );
};

const Autocomplete = styled(forwardRef(AutoCompleteRef))(({ theme }) => ({
  [`& .${inputBaseClasses.root}`]: {
    fontSize: 12,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.common.black : theme.palette.common.white,
    paddingTop: 0,
    paddingBottom: 0
  },
  [`& .${inputBaseClasses.root} .${svgIconClasses.root}`]: {
    fontSize: 18
  },
  [`& .${inputBaseClasses.root}.${inputBaseClasses.focused} .${outlinedInputClasses.notchedOutline}`]: {
    borderWidth: 1
  },
  [`& .${inputBaseClasses.root}.${inputBaseClasses.disabled}`]: {
    backgroundColor: theme.palette.action.disabled
  },
  [`& .${inputBaseClasses.root}.${inputBaseClasses.focused} .${outlinedInputClasses.notchedOutline}`]: {
    borderWidth: 1
  },
  [`& .${inputBaseClasses.root}.${inputBaseClasses.focused}:hover .${outlinedInputClasses.notchedOutline}`]: {
    borderColor: theme.palette.primary.main
  }
}));

export default Autocomplete;
