import { GridRenderCellParams } from '@mui/x-data-grid';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '~/base/components/Material/Button';

export const CellTotal = (props: GridRenderCellParams) => {
  const {
    row:
    field,
    value
  } = props;

  const navigation = useNavigate();

  const onDoubleClick = useCallback(() => {
  }, [field, navigation]);
  return (
    <Button variant='text' onDoubleClick={onDoubleClick} style={{ textTransform: 'lowercase' }}>
      {Number(`${value || 0}`).toLocaleString()}
    </Button>
  );
};
