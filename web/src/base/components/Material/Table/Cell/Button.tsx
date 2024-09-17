import { styled } from '@mui/material';
import { ButtonProps, buttonClasses } from '@mui/material/Button';
import { forwardRef } from 'react';
import MuiButton from '../../Button';

const ButtonRef = (
  props: ButtonProps,
  ref: ((instance: HTMLButtonElement | null) => void) | React.RefObject<HTMLButtonElement> | null
) => <MuiButton ref={ref} variant='outlined' disableRipple {...props} />;

const Button = styled(forwardRef(ButtonRef))(({ theme }) => ({
  [`&.${buttonClasses.outlined}`]: {
    color: '#4F5C61',
    borderColor: '#E7EAEC',
    backgroundColor: theme.palette.mode === 'dark' ? '#1E1E1E' : '#FFFFFF'
  },
  [`&.${buttonClasses.outlined}:hover`]: {
    color: '#FFFFFF',
    backgroundColor: theme.palette.mode === 'dark' ? '#6C757D' : '#4F5C61',
    [`& .fa-icon`]: {
      color: '#FFFFFF'
    }
  }
}));

export default Button;
