import { TableBody, TableHead, TableRow, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Typography from '~/base/components/Material/Typography';
import View from '~/base/components/Material/View';
import LayoutWrapper from '~/base/layout/Wrapper';
import { CisBoxLogoStyled, TableCellStyled, TableStyled, TypographyTableStyled } from './styles';

const HelpsAboutScreen = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <LayoutWrapper title={t('app.title.helps.about')} breadcrumbs={{ title: t('app.breadcrumb.helps.about') }}>
      <View p='20px' flexGrow={1}>
        <View
          width='450px'
          border='1px solid #B5C3CE'
          p='20px'
          m='50px auto'
          bgcolor={theme.palette.mode === 'dark' ? '#222222' : '#FFFFFF'}
        >
          <View flexDirection='row' justifyContent='space-between'>
            <Typography>cisbox Invoice is a product of cisbox GmbH</Typography>
            <CisBoxLogoStyled
              src={
                theme.palette.mode === 'dark'
                  ? '/images/cisbox_logo_simple_dark.svg'
                  : '/images/cisbox_logo_simple_light.svg'
              }
              alt='cisbox Accounting'
            />
          </View>
          <Typography>cisbox Invoice is available in:</Typography>
          <Typography>German, English, US-English, French, Spanish</Typography>
          <TableStyled>
            <TableHead>
              <TableRow>
                <TableCellStyled align='center' sx={{ width: '50%' }}>
                  MINIMUM REQUIREMENTS
                </TableCellStyled>
                <TableCellStyled align='center'>RECOMMENDED</TableCellStyled>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCellStyled align='center'>
                  <TypographyTableStyled fontWeight='bold'>Internet connection</TypographyTableStyled>
                  <TypographyTableStyled>DSL 1 MB/s</TypographyTableStyled>
                </TableCellStyled>
                <TableCellStyled align='center'>
                  <TypographyTableStyled fontWeight='bold'>Internet connection</TypographyTableStyled>
                  <TypographyTableStyled>DSL 16 MB/s</TypographyTableStyled>
                </TableCellStyled>
              </TableRow>
              <TableRow>
                <TableCellStyled align='center'>
                  <TypographyTableStyled fontWeight='bold'>Screen resolution</TypographyTableStyled>
                  <TypographyTableStyled>1280 x 800 px</TypographyTableStyled>
                </TableCellStyled>
                <TableCellStyled align='center'>
                  <TypographyTableStyled fontWeight='bold'>Screen resolution</TypographyTableStyled>
                  <TypographyTableStyled>1920 x 1080 px</TypographyTableStyled>
                </TableCellStyled>
              </TableRow>
              <TableRow>
                <TableCellStyled align='center'>
                  <TypographyTableStyled fontWeight='bold'>PDF viewer</TypographyTableStyled>
                  <TypographyTableStyled>Acrobat Reader</TypographyTableStyled>
                  <TypographyTableStyled>(latest version)</TypographyTableStyled>
                </TableCellStyled>
                <TableCellStyled align='center'>
                  <TypographyTableStyled fontWeight='bold'>PDF viewer</TypographyTableStyled>
                  <TypographyTableStyled>Acrobat Reader</TypographyTableStyled>
                  <TypographyTableStyled>(latest version)</TypographyTableStyled>
                </TableCellStyled>
              </TableRow>
              <TableRow>
                <TableCellStyled align='center'>
                  <TypographyTableStyled fontWeight='bold'>Internet browser</TypographyTableStyled>
                  <TypographyTableStyled>Firefox, Chrome, Edge, Safari</TypographyTableStyled>
                  <TypographyTableStyled>(latest version)</TypographyTableStyled>
                </TableCellStyled>
                <TableCellStyled align='center'>
                  <TypographyTableStyled fontWeight='bold'>Internet browser</TypographyTableStyled>
                  <TypographyTableStyled>Firefox, Chrome</TypographyTableStyled>
                  <TypographyTableStyled>(latest version)</TypographyTableStyled>
                </TableCellStyled>
              </TableRow>
            </TableBody>
          </TableStyled>
          <Typography>https://www.cisbox.com</Typography>
        </View>
      </View>
    </LayoutWrapper>
  );
};

export default HelpsAboutScreen;
