import { GridColDef } from '@mui/x-data-grid';
import { FormikProps } from 'formik';
import { KeyboardEvent, useCallback, useMemo, useRef, useState } from 'react';
import Typography from '~/base/components/Material/Typography';
import View from '~/base/components/Material/View';
import { SystemAccountResponse } from '~/main/features/account-settings/system-accounts/types';
import { AllocationItemsDetailChanged, AllocationItemsDetailResponse } from '~/main/features/allocation/items/types';
import { FormValues } from '../../common/form';
import AccountSystemOptions from './AccountSystemOptions';
import { useTheme } from '@mui/material';

type RowDetailProps = {
  formik: FormikProps<FormValues>;
  detail: AllocationItemsDetailResponse;
  columns: GridColDef[];
  onChange?: (item: AllocationItemsDetailChanged) => void;
};

const RowDetail = (props: RowDetailProps) => {
  const { formik, detail, columns, onChange } = props;

  const theme = useTheme();

  const { values } = formik;
  const { systemAccount = null } = values;

  const [systemAccountOpen, setSystemAccountOpen] = useState(false);
  const systemAccountInputRef = useRef<HTMLInputElement>();

  const columnWidthStorage = JSON.parse(localStorage.getItem('DataGridColumnWidth') || '{}');
  const [columnWidth] = useState<{ [key: string]: number }>(columnWidthStorage['allocation.items.update']);

  const onChangeSystemAccount = useCallback(
    async (systemAccount: SystemAccountResponse) => {
      formik.setFieldValue('systemAccount', systemAccount);

      if (onChange) {
        onChange({
          systemAccountId: systemAccount?.id,
          systemAccountNo: systemAccount?.accountNo
        });
      }

      setSystemAccountOpen(false);
    },
    [formik, onChange]
  );

  const onKeyDownSystemAccount = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter') {
        if (systemAccount) {
          if (onChange) {
            onChange({
              systemAccountId: systemAccount?.id,
              systemAccountNo: systemAccount?.accountNo
            });
          }
        }

        formik.submitForm();

        return;
      }

      setSystemAccountOpen(true);
    },
    [formik, onChange, systemAccount]
  );

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
          <AccountSystemOptions
            sx={{ display: 'flex' }}
            formik={formik}
            open={systemAccountOpen}
            inputRef={systemAccountInputRef}
            onChangeOpen={setSystemAccountOpen}
            onChangeValue={onChangeSystemAccount}
            onKeyDown={onKeyDownSystemAccount}
          />
        </RowDetailItem>
      </View>
    </View>
  );
};

export default RowDetail;

type RowDetailItemProps = {
  columns: {
    [key: string]: {
      width: number;
      headerName: string;
    };
  };
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
