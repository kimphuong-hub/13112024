import { GridRenderCellParams } from '@mui/x-data-grid';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '~/base/components/Material/Button';

export const CellTotal = (props: GridRenderCellParams) => {
  const {
    row: { companyNo: groupNr },
    value,
    field
  } = props;

  const navigation = useNavigate();

  const onDoubleClick = useCallback(() => {
    const queryParams = new URLSearchParams();

    const fieldsStatus = {
      checked: 'checked',
      allocation1: 'allocation1',
      allocation2: 'allocation2',
      verification: 'verification'
    };

    queryParams.append('status', fieldsStatus[field as keyof typeof fieldsStatus]);

    const queryString = queryParams.toString();

    navigation(`/allocation/items/update/${groupNr}?${queryString}`);
  }, [field, groupNr, navigation]);

  return (
    <Button variant='text' onDoubleClick={value ? onDoubleClick : () => {}}>
      {Number(`${value || 0}`).toLocaleString()}
    </Button>
  );
};
