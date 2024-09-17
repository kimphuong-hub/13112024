import { styled } from '@mui/material';
import MuiButton, { ButtonProps, buttonClasses } from '@mui/material/Button';
import { forwardRef } from 'react';

const ButtonRef = (
  props: ButtonProps,
  ref: ((instance: HTMLButtonElement | null) => void) | React.RefObject<HTMLButtonElement> | null
) => <MuiButton ref={ref} variant='contained' disableRipple {...props} />;

const Button = styled(forwardRef(ButtonRef))(() => ({
  [`&`]: {
    fontSize: 12,
    minWidth: 'auto',
    boxShadow: 'none',
    textTransform: 'none',
    padding: '7px 10px'
  },
  [`&:hover`]: {
    boxShadow: 'none'
  },
  [`&.${buttonClasses.text}`]: {
    borderColor: 'initial'
  },
  [`&.${buttonClasses.textPrimary}`]: {
    color: '#337AB7',
    borderColor: 'initial'
  }
}));

export default Button;
