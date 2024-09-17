import MuiAppBar, { AppBarProps } from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import Typography from '~/base/components/Material/Typography';

export const AppBar = styled(MuiAppBar)<AppBarProps>(({ theme }) => ({
  [`&`]: {
    boxShadow: '0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 12%)',
    backgroundColor: theme.palette.primary.main,
    zIndex: theme.zIndex.drawer + 1
  }
}));

export const TypographyTitleStyled = styled(Typography)(() => ({
  fontSize: 24,
  fontWeight: 100
}));
