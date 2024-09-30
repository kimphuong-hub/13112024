import { useTheme } from '@mui/material';
import { useFormikContext } from 'formik';
import React, { useCallback, useContext, useLayoutEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import TextField from '~/base/components/Material/Form/TextField';
import Typography from '~/base/components/Material/Typography';
import View from '~/base/components/Material/View';
import { FormValues } from '../../../common/form';
import { SelectedContext } from '../../../contexts/selected';
import { useColumns } from './common/columns';

const RowReply = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  const inputRef = useRef<HTMLInputElement | null>();

  const { allocationItem } = useContext(SelectedContext);

  const { values, setFieldValue, submitForm } = useFormikContext<FormValues>();

  useLayoutEffect(() => {
    if (inputRef.current) {
      inputRef.current?.focus();
    }
  }, []);

  const borderStyle =
    theme.palette.mode === 'dark' ? '1px solid rgba(81, 81, 81, 1)' : '1px solid rgba(224, 224, 224, 1)';
  const backgroundColor = theme.palette.mode === 'dark' ? '#1E1E1E' : '#FAFAFA';

  const columns = useColumns(t);

  const columnsProxy = useMemo(
    () =>
      columns.reduce(
        (accumulator, current) => ({
          ...accumulator,
          [current.field]: { width: current.width, headerName: current.headerName }
        }),
        {}
      ) as { [key: string]: { width: number; headerName: string } },
    [columns]
  );

  const onChangeReplyComment = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFieldValue('replyComment', event.target.value);
      setTimeout(() => submitForm(), 100);
    },
    [setFieldValue, submitForm]
  );

  return (
    <View mr='5px' style={{ border: borderStyle }}>
      <View
        flexGrow={1}
        flexDirection='row'
        justifyContent='space-between'
        style={{ borderBottom: borderStyle, backgroundColor }}
      >
        <RowDetailItem columns={columnsProxy} columnName='clarificationDate'>
          {columnsProxy['clarificationDate'].headerName}
        </RowDetailItem>
        <RowDetailItem columns={columnsProxy} columnName='clarificationComment'>
          {columnsProxy['clarificationComment'].headerName}
        </RowDetailItem>
        <RowDetailItem columns={columnsProxy} columnName='clarificationUsername'>
          {columnsProxy['clarificationUsername'].headerName}
        </RowDetailItem>
        <RowDetailItem columns={columnsProxy} columnName='clarificationReplyComment'>
          {columnsProxy['clarificationReplyComment'].headerName}
        </RowDetailItem>
        <RowDetailItem columns={columnsProxy} columnName='clarificationReplyUsername'>
          {columnsProxy['clarificationReplyUsername'].headerName}
        </RowDetailItem>
      </View>
      <View flexGrow={1} flexDirection='row' justifyContent='space-between'>
        <RowDetailItem columns={columnsProxy} columnName='clarificationDate'>
          {allocationItem?.clarificationDate}
        </RowDetailItem>
        <RowDetailItem columns={columnsProxy} columnName='clarificationComment'>
          {allocationItem?.clarificationComment}
        </RowDetailItem>
        <RowDetailItem columns={columnsProxy} columnName='clarificationUsername'>
          {allocationItem?.clarificationUsername}
        </RowDetailItem>
        <RowDetailItem columns={columnsProxy} columnName='clarificationReplyComment'>
          <View py={0.5}>
            <TextField
              sx={{ px: '10px', [`& .MuiInputBase-root`]: { py: 0 } }}
              rows={2}
              multiline
              inputRef={inputRef}
              value={values.replyComment}
              onChange={onChangeReplyComment}
            />
          </View>
        </RowDetailItem>
        <RowDetailItem columns={columnsProxy} columnName='clarificationReplyUsername'>
          {allocationItem?.clarificationReplyUsername}
        </RowDetailItem>
      </View>
    </View>
  );
};

export default RowReply;

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
