import { GridRenderCellParams } from '@mui/x-data-grid';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '~/base/components/Material/Button';

export const CellTotal = (props: GridRenderCellParams) => {
  const {
    row: { publicId },
    value
  } = props;

  const navigation = useNavigate();

  const onDoubleClick = useCallback(() => {
    const queryParams = new URLSearchParams();

    const queryString = queryParams.toString();

    navigation(`/account-settings/group-accounts/update/${publicId}?${queryString}`);
  }, [navigation, publicId]);

  return (
    <Button variant='text' onDoubleClick={onDoubleClick} style={{ textTransform: 'lowercase' }}>
      {Number(`${value || 0}`).toLocaleString()}
    </Button>
  );
};
