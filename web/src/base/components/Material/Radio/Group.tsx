import { styled } from '@mui/material';
import MuiRadioGroup, { RadioGroupProps } from '@mui/material/RadioGroup';

const RadioGroup = styled((props: RadioGroupProps) => <MuiRadioGroup {...props} />, {
  shouldForwardProp: (prop) => prop !== 'color' && prop !== 'fontSize'
})(() => ({}));

export default RadioGroup;
