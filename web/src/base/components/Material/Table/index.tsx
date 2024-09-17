import { styled } from '@mui/material';
import MuiTableCell, { TableCellProps } from '@mui/material/TableCell';
import MuiTableContainer, { TableContainerProps } from '@mui/material/TableContainer';
import MuiTableRow, { TableRowProps } from '@mui/material/TableRow';

export const TableCell = styled((props: TableCellProps) => <MuiTableCell {...props} />)(() => ({
  [`&`]: {
    fontSize: 12,
    padding: 6
  }
}));

export const TableContainer = styled((props: TableContainerProps) => <MuiTableContainer {...props} />)(() => ({
  [`&`]: {
    boxShadow: 'none'
  }
}));

export const TableRow = styled((props: TableRowProps) => <MuiTableRow {...props} />)(() => ({
  [`&:last-child td, &:last-child th`]: {
    border: 0
  }
}));
