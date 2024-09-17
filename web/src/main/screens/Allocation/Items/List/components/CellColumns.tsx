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

    const fields = {
      inProcess: 'allocation1',
      checked: 'checked'
    };

    queryParams.append('status', fields[field as keyof typeof fields]);

    const queryString = queryParams.toString();

    navigation(`/allocation/items/update/${groupNr}?${queryString}`);
  }, [field, groupNr, navigation]);

  return (
    <Button variant='text' onDoubleClick={value ? onDoubleClick : () => {}}>
      {Number(`${value || 0}`).toLocaleString()}
    </Button>
  );
};
