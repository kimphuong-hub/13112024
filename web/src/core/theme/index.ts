/* eslint-disable @typescript-eslint/no-empty-object-type */
import { common } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
import themeColors from '../../../theme/colors.json';

declare module '@mui/material/styles' {
  interface CustomTheme {
    customColors: {
      brand: { primary: string };
      topBar: { primary: string };
    };
  }

  interface Theme extends CustomTheme {}
  interface ThemeOptions extends CustomTheme {}
}

export const accountingTheme = createTheme({
  palette: {
    primary: { main: '#44D62C' },
    text: { primary: common.black, secondary: '#828282' },
    background: { paper: common.white, default: common.white }
  },
  breakpoints: {
    values: { xs: 0, sm: 600, md: 960, lg: 1280, xl: 1920 }
  },
  customColors: themeColors['Cisbox']
});

export const accountingDarkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#44D62C' },
    text: { primary: common.white, secondary: common.white },
    background: { paper: '#121212', default: '#343A40' }
  },
  customColors: themeColors['Cisbox']
});
