import { inputBaseClasses, outlinedInputClasses, styled } from '@mui/material';
import MuiTextField, { TextFieldProps } from '@mui/material/TextField';
import { forwardRef } from 'react';

const AutoCompleteTextFieldRef = (
  props: TextFieldProps,
  ref: ((instance: HTMLDivElement | null) => void) | React.RefObject<HTMLDivElement> | null
) => {
  return <MuiTextField ref={ref} style={{ flexGrow: 1 }} size='small' variant='outlined' {...props} />;
};

const AutoCompleteTextField = styled(forwardRef(AutoCompleteTextFieldRef))(({ theme }) => ({
  [`& .${inputBaseClasses.root}`]: {
    fontSize: 13,
    backgroundColor: theme.palette.mode === 'dark' ? '#1E1E1E' : theme.palette.common.white,
    paddingRight: 0
  },
  [`& .${inputBaseClasses.root} .${inputBaseClasses.input}`]: {
    paddingTop: '9px',
    paddingBottom: '9px'
  },
  [`& .${inputBaseClasses.root} .${inputBaseClasses.input}.${inputBaseClasses.inputSizeSmall}`]: {
    paddingTop: 0,
    paddingBottom: 0
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

export default AutoCompleteTextField;
