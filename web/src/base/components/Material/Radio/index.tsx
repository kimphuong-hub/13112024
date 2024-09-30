import { styled } from '@mui/material';
import MuiRadio, { RadioProps } from '@mui/material/Radio';

const Radio = styled((props: RadioProps) => <MuiRadio {...props} />, {
  shouldForwardProp: (prop) => prop !== 'color' && prop !== 'fontSize'
})(() => ({}));

export default Radio;
