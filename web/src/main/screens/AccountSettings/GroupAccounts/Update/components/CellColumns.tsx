import { Checkbox, useTheme } from '@mui/material';
import { GridRenderCellParams } from '@mui/x-data-grid';
import { useCallback, useMemo } from 'react';
import Button from '~/base/components/Material/Button';
import Typography from '~/base/components/Material/Typography';
import { groupAccountsAction } from '~/main/features/account-settings/group-accounts/slice';
import { useDispatchApp } from '~/redux/store';

export const CellChecked = (
  props: GridRenderCellParams & {
    onChecked?: (id: string, checked: boolean) => void;
  }
) => {
  const {
    row: { id, accountName: _accountName, systemAccountName: _systemAccountName, systemAccountRef },
    value: checked,
    onChecked
  } = props;

  const checkedDefault = useMemo(() => {
    const accountName = _accountName?.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
    const systemAccountName = _systemAccountName?.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');

    return accountName === systemAccountName;
  }, [_accountName, _systemAccountName]);

  return (
    <Checkbox
      disabled={checkedDefault || !systemAccountRef}
      defaultChecked={checked || checkedDefault}
      onChange={(_, checked) => onChecked && onChecked(id, checked)}
    />
  );
};

export const CellAccountName = (props: GridRenderCellParams) => {
  const {
    row: { accountName: _accountName, systemAccountName: _systemAccountName }
  } = props;

  const theme = useTheme();

  const condition = useMemo(() => {
    const accountName = _accountName?.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
    const systemAccountName = _systemAccountName?.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');

    return accountName === systemAccountName;
  }, [_accountName, _systemAccountName]);

  return <Typography {...(condition ? { color: theme.palette.primary.main } : {})}>{props.value}</Typography>;
};

export const CellSystemAccountName = (props: GridRenderCellParams) => {
  const {
    row: { accountName: _accountName, systemAccountName: _systemAccountName }
  } = props;

  const theme = useTheme();

  const condition = useMemo(() => {
    const accountName = _accountName?.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
    const systemAccountName = _systemAccountName?.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');

    return accountName === systemAccountName;
  }, [_accountName, _systemAccountName]);

  return <Typography {...(condition ? { color: theme.palette.primary.main } : {})}>{props.value}</Typography>;
};

export const CellAllocatedItems = (props: GridRenderCellParams) => {
  const { row, value } = props;

  const dispatch = useDispatchApp();

  const onDoubleClick = useCallback(() => {
    dispatch(groupAccountsAction.setAllocationItemsDrawer(row));
  }, [dispatch, row]);

  return (
    <Button variant='text' onDoubleClick={onDoubleClick}>
      {Number(`${value || 0}`).toLocaleString()}
    </Button>
  );
};
