import { Box, BoxProps, Table, TableCell, styled } from '@mui/material';
import Typography from '~/base/components/Material/Typography';

export const CisBoxLogoStyled = styled((props: BoxProps<'img'>) => <Box component='img' {...props} />)(() => ({
  [`&`]: {
    width: '155px',
    height: '41px'
  }
}));

export const TableStyled = styled(Table)(() => ({
  [`&`]: {
    backgroundColor: 'white',
    margin: '20px auto'
  },
  [`& td, & th`]: {
    border: 0
  },
  [`& thead tr`]: {
    borderBottom: '2px solid'
  }
}));

export const TableCellStyled = styled(TableCell)(() => ({
  color: '#000000',
  fontSize: 12,
  padding: 10
}));

export const TypographyTableStyled = styled(Typography)(() => ({
  color: '#000000'
}));
