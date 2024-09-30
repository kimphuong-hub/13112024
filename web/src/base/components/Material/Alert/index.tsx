import { styled } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = styled((props: AlertProps) => <MuiAlert {...props} />)(() => ({
  [`&`]: {
    fontSize: 12
  }
}));

export default Alert;
