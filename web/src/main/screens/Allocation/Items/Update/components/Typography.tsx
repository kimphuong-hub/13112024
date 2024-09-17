import { TypographyProps, styled } from '@mui/material';
import Typography from '~/base/components/Material/Typography';

export const Label = styled((props: TypographyProps) => <Typography {...props} />, {
  shouldForwardProp: (prop) => prop !== 'color' && prop !== 'fontSize'
})(({ theme, fontSize }) => ({
  color: theme.palette.mode === 'dark' ? '#b7b9b4' : '#6C757D',
  fontSize: typeof fontSize === 'number' ? fontSize : 12,
  fontWeight: 'bold'
}));

export const ItemValue = styled((props: TypographyProps) => <Typography {...props} />, {
  shouldForwardProp: (prop) => prop !== 'color' && prop !== 'fontSize'
})(({ theme, fontSize }) => ({
  color: theme.palette.mode === 'dark' ? '#ebede9' : '#4F5C61',
  fontSize: typeof fontSize === 'number' ? fontSize : 12,
  fontWeight: 'bold'
}));
