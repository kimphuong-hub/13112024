import { useTheme } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useFormikContext } from 'formik';
import { useCallback, useContext, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import FontAwesomeIcon from '~/base/components/Icon/FontAwesome';
import Button from '~/base/components/Material/Button';
import Typography from '~/base/components/Material/Typography';
import View from '~/base/components/Material/View';
import { allowedStatusCheckSystemAccount } from '../../common/config';
import { FormValues } from '../../common/form';
import AccountSystemOptions from './Options/AccountSystemOptions';
import { SelectedContext } from '../../contexts/selected';

type RowDetailProps = {
  columns: GridColDef[];
  onNextItem: () => void;
};

const RowDetail = (props: RowDetailProps) => {
  const { columns, onNextItem } = props;

  const theme = useTheme();

  const [searchParams] = useSearchParams();
  const status = searchParams.get('status') || '';

  const { touched, errors, submitForm } = useFormikContext<FormValues>();
  const { allocationItem } = useContext(SelectedContext);

  const columnWidthStorage = JSON.parse(localStorage.getItem('DataGridColumnWidth') || '{}');
  const [columnWidth] = useState<{ [key: string]: number }>(columnWidthStorage['allocation.items.update']);

  const borderStyle =
    theme.palette.mode === 'dark' ? '1px solid rgba(81, 81, 81, 1)' : '1px solid rgba(224, 224, 224, 1)';
  const backgroundColor = theme.palette.mode === 'dark' ? '#1E1E1E' : '#FAFAFA';

  const onCheckSystemAccount = useCallback(() => {
    submitForm();
    onNextItem();
  }, [onNextItem, submitForm]);

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
    <View
      mr='5px'
      style={{
        border: borderStyle,
        ...(!(touched.systemAccount && Boolean(errors.systemAccount)) && {
          marginBottom: '20px'
        })
      }}
    >
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
          {allocationItem?.itemNumber}
        </RowDetailItem>
        <RowDetailItem columns={columnsProxy} columnName='itemName'>
          {allocationItem?.itemName}
        </RowDetailItem>
        <RowDetailItem columns={columnsProxy} columnName='unit'>
          {allocationItem?.unit}
        </RowDetailItem>
        <RowDetailItem columns={columnsProxy} columnName='net'>
          {allocationItem?.net}
        </RowDetailItem>
        <RowDetailItem columns={columnsProxy} columnName='vat'>
          {allocationItem?.vat}
        </RowDetailItem>
        <RowDetailItem columns={columnsProxy} columnName='systemAccountName'>
          <View flexDirection='row' alignItems='center' gap={1}>
            <AccountSystemOptions sx={{ display: 'flex' }} onNextItem={onNextItem} />
            {allowedStatusCheckSystemAccount.includes(status) && (
              <View>
                <Button color='warning' onClick={onCheckSystemAccount}>
                  <FontAwesomeIcon icon='fa-regular fa-check' size={11} color={theme.palette.common.white} />
                </Button>
              </View>
            )}
          </View>
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
