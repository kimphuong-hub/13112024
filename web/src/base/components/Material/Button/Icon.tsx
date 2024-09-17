import { styled } from '@mui/material';
import MuiIconButton, { IconButtonProps } from '@mui/material/IconButton';
import { forwardRef } from 'react';

const IconButtonRef = (
  props: IconButtonProps,
  ref: ((instance: HTMLButtonElement | null) => void) | React.RefObject<HTMLButtonElement> | null
) => <MuiIconButton ref={ref} edge='start' color='inherit' disableTouchRipple disableFocusRipple {...props} />;

const IconButton = styled(forwardRef(IconButtonRef))(() => ({
  outline: 0,
  borderRadius: '5px',
  padding: '0.375rem 0.75rem'
}));

export default IconButton;
