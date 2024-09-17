import { styled } from '@mui/material';
import MuiInputLabel, { InputLabelProps } from '@mui/material/InputLabel';

const Label = styled((props: InputLabelProps) => <MuiInputLabel style={{ whiteSpace: 'normal' }} {...props} />)(
  ({ theme }) => ({
    [`&`]: {
      color: theme.palette.text.secondary,
      fontSize: 12
    }
  })
);

export default Label;
