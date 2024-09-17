import { inputBaseClasses, outlinedInputClasses, styled } from '@mui/material';
import MuiTextField, { TextFieldProps } from '@mui/material/TextField';
import { forwardRef } from 'react';

const TextFieldRef = (
  props: TextFieldProps,
  ref: ((instance: HTMLInputElement | null) => void) | React.RefObject<HTMLInputElement> | null
) => <MuiTextField ref={ref} {...props} />;

const NavbarSearch = styled(forwardRef(TextFieldRef))(() => ({
  [`& .${inputBaseClasses.root}`]: {
    fontSize: 15
  },
  [`& .${inputBaseClasses.root} .${inputBaseClasses.input}`]: {
    paddingTop: '12px',
    paddingBottom: '12px'
  },
  [`& .${inputBaseClasses.root}.${inputBaseClasses.focused}`]: {
    backgroundColor: '#7de26c'
  },
  [`& .${inputBaseClasses.root} .${outlinedInputClasses.notchedOutline}`]: {
    borderWidth: 0
  }
}));

export default NavbarSearch;
