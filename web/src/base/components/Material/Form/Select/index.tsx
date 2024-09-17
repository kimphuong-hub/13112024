import { inputBaseClasses, outlinedInputClasses, styled, svgIconClasses } from '@mui/material';
import MuiSelect, { SelectProps, selectClasses } from '@mui/material/Select';

const Select = styled((props: SelectProps) => (
  <MuiSelect style={{ flexGrow: 1 }} size='small' variant='outlined' {...props} />
))(({ theme }) => ({
  [`&.${inputBaseClasses.root}`]: {
    fontSize: 12,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.common.black : theme.palette.common.white
  },
  [`&.${inputBaseClasses.root} .${selectClasses.select}`]: {
    paddingTop: '7px',
    paddingBottom: '7px'
  },
  [`&.${inputBaseClasses.root} .${svgIconClasses.root}`]: {
    fontSize: 18
  },
  [`&.${inputBaseClasses.root}.${inputBaseClasses.focused} .${outlinedInputClasses.notchedOutline}`]: {
    borderWidth: 1
  },
  [`&.${inputBaseClasses.root}.${inputBaseClasses.disabled}`]: {
    backgroundColor: theme.palette.action.disabled
  },
  [`&.${inputBaseClasses.root}.${inputBaseClasses.focused} .${outlinedInputClasses.notchedOutline}`]: {
    borderWidth: 1
  },
  [`&.${inputBaseClasses.root}.${inputBaseClasses.focused}:hover .${outlinedInputClasses.notchedOutline}`]: {
    borderColor: theme.palette.primary.main
  }
}));

export default Select;
