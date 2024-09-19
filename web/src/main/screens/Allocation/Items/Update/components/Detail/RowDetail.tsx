import { useTheme } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { FormikProps } from 'formik';
import { useMemo, useState } from 'react';
import Typography from '~/base/components/Material/Typography';
import View from '~/base/components/Material/View';
import { AllocationItemsDetailResponse } from '~/main/features/allocation/items/types';
import { FormValues } from '../../common/form';
import AccountSystemOptions from './AccountSystemOptions';

type RowDetailProps = {
  formik: FormikProps<FormValues>;
  detail: AllocationItemsDetailResponse;
  columns: GridColDef[];
};

const RowDetail = (props: RowDetailProps) => {
  const { formik, detail, columns } = props;

  const theme = useTheme();

  const columnWidthStorage = JSON.parse(localStorage.getItem('DataGridColumnWidth') || '{}');
  const [columnWidth] = useState<{ [key: string]: number }>(columnWidthStorage['allocation.items.update']);

  const borderStyle =
    theme.palette.mode === 'dark' ? '1px solid rgba(81, 81, 81, 1)' : '1px solid rgba(224, 224, 224, 1)';
  const backgroundColor = theme.palette.mode === 'dark' ? '#1E1E1E' : '#FAFAFA';

  const columnsProxy = useMemo(
    () =>
      columns.reduce(
        (accumulator, current) => ({
          ...accumulator,
          [current.field]: {
            width: columnWidth?.[current.field] || current.width,
            headerName: current.headerName
          }
        }),
        {}
      ) as { [key: string]: { width: number; headerName: string } },
    [columnWidth, columns]
  );

  return (
    <View mr='5px' style={{ border: borderStyle }}>
      <View
        flexGrow={1}
        flexDirection='row'
        justifyContent='space-between'
        style={{ borderBottom: borderStyle, backgroundColor }}
      >
        <RowDetailItem columns={columnsProxy} columnName='itemNumber'>
          {columnsProxy['itemNumber'].headerName}
        </RowDetailItem>
        <RowDetailItem columns={columnsProxy} columnName='itemName'>
          {columnsProxy['itemName'].headerName}
        </RowDetailItem>
        <RowDetailItem columns={columnsProxy} columnName='unit'>
          {columnsProxy['unit'].headerName}
        </RowDetailItem>
        <RowDetailItem columns={columnsProxy} columnName='net'>
          {columnsProxy['net'].headerName}
        </RowDetailItem>
        <RowDetailItem columns={columnsProxy} columnName='vat'>
          {columnsProxy['vat'].headerName}
        </RowDetailItem>
        <RowDetailItem columns={columnsProxy} columnName='systemAccountName'>
          {columnsProxy['systemAccountName'].headerName}
        </RowDetailItem>
      </View>
      <View flexGrow={1} flexDirection='row' justifyContent='space-between'>
        <RowDetailItem columns={columnsProxy} columnName='itemNumber'>
          {detail.itemNumber}
        </RowDetailItem>
        <RowDetailItem columns={columnsProxy} columnName='itemName'>
          {detail.itemName}
        </RowDetailItem>
        <RowDetailItem columns={columnsProxy} columnName='unit'>
          {detail.unit}
        </RowDetailItem>
        <RowDetailItem columns={columnsProxy} columnName='net'>
          {detail.net}
        </RowDetailItem>
        <RowDetailItem columns={columnsProxy} columnName='vat'>
          {detail.vat}
        </RowDetailItem>
        <RowDetailItem columns={columnsProxy} columnName='systemAccountName'>
          <AccountSystemOptions sx={{ display: 'flex' }} formik={formik} />
        </RowDetailItem>
      </View>
    </View>
  );
};

export default RowDetail;

type RowDetailItemProps = {
  columns: { [key: string]: { width: number; headerName: string } };
  columnName: string;
  children?: React.ReactNode;
};

export const RowDetailItem = (props: RowDetailItemProps) => {
  const { columns, columnName, children } = props;

  return (
    <View
      minHeight='40px'
      boxSizing='border-box'
      justifyContent='center'
      {...(!columns[columnName].width && { width: '100%' })}
    >
      {['string', 'number'].includes(typeof children) && (
        <Typography
          px='10px'
          fontSize={12.5}
          boxSizing='border-box'
          {...(columns[columnName].width && { minWidth: columns[columnName].width })}
        >
          {children}
        </Typography>
      )}
      {!['string', 'number'].includes(typeof children) && (
        <View
          px='10px'
          fontSize={12.5}
          boxSizing='border-box'
          {...(columns[columnName].width && { minWidth: columns[columnName].width })}
        >
          {children}
        </View>
      )}
    </View>
  );
};
