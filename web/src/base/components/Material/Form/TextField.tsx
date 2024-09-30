import { inputBaseClasses, outlinedInputClasses, styled } from '@mui/material';
import MuiTextField, { TextFieldProps } from '@mui/material/TextField';
import { forwardRef } from 'react';

const TextFieldRef = (
  props: TextFieldProps,
  ref: ((instance: HTMLDivElement | null) => void) | React.RefObject<HTMLDivElement> | null
) => (
  <MuiTextField
    ref={ref}
    style={{ flexGrow: 1 }}
    size='small'
    variant='outlined'
    InputProps={{ autoComplete: 'off' }}
    {...props}
  />
);

const TextField = styled(forwardRef(TextFieldRef))(({ theme }) => ({
  [`& .${inputBaseClasses.root}`]: {
    fontSize: 12,
    backgroundColor: theme.palette.mode === 'dark' ? '#1E1E1E' : theme.palette.common.white,
    paddingRight: 0
  },
  [`& .${inputBaseClasses.root} .${inputBaseClasses.input}`]: {
    paddingTop: '9px',
    paddingBottom: '9px'
  },
  [`& .${inputBaseClasses.root} .${inputBaseClasses.input}.${inputBaseClasses.inputSizeSmall}`]: {
    paddingTop: '7px',
    paddingBottom: '7px'
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

export default TextField;
