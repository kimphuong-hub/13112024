import { styled, typographyClasses } from '@mui/material';
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel';

const FormControlLabel = styled(
  (props: FormControlLabelProps & { color?: string; fontSize?: number }) => <MuiFormControlLabel {...props} />,
  { shouldForwardProp: (prop) => prop !== 'color' && prop !== 'fontSize' }
)(({ color, fontSize, theme }) => ({
  [`& .${typographyClasses.root}`]: {
    color: typeof color === 'string' ? color : theme.palette.text.primary,
    fontSize: typeof fontSize === 'number' ? fontSize : 12.5
  }
}));

export default FormControlLabel;
