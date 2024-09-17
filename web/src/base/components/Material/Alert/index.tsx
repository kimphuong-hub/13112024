import { styled } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

export const Alert = styled((props: AlertProps) => <MuiAlert {...props} />)(() => ({
  [`&`]: {
    fontSize: 12
  }
}));
