import { styled } from '@mui/material';
import { ButtonProps, buttonClasses } from '@mui/material/Button';
import { forwardRef } from 'react';
import MuiButton from '../Material/Button';

const ButtonRef = (
  props: ButtonProps,
  ref: ((instance: HTMLButtonElement | null) => void) | React.RefObject<HTMLButtonElement> | null
) => <MuiButton ref={ref} variant='contained' disableRipple {...props} />;

const Button = styled(forwardRef(ButtonRef))(({ color }) => ({
  [`&`]: {
    height: '30px'
  },
  [`&.${buttonClasses.contained}`]: {
    color: '#FFFFFF',
    backgroundColor: color === 'secondary' ? '#6C757D' : '#4F5C61'
  },
  [`&.${buttonClasses.contained}:hover`]: {
    backgroundColor: color === 'secondary' ? '#5A6268' : '#394346'
  }
}));

export default Button;
