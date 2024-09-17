import { GridRenderCellParams } from '@mui/x-data-grid';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '~/base/components/Material/Button';
import { QueryStringParams } from '../../Update/common/params';

export const CellTotal = (props: GridRenderCellParams) => {
  const {
    row: { publicId },
    field,
    value
  } = props;

  const navigation = useNavigate();

  const onDoubleClick = useCallback(() => {
    const typeParam = QueryStringParams.type[field as keyof typeof QueryStringParams.type];

    const queryParams = new URLSearchParams();
    if (typeParam) {
      queryParams.append('type', typeParam);
    }

    const queryString = queryParams.toString();

    navigation(`/account-settings/group-accounts/update/${publicId}?${queryString}`);
  }, [field, navigation, publicId]);

  return (
    <Button variant='text' onDoubleClick={onDoubleClick} style={{ textTransform: 'lowercase' }}>
      {Number(`${value || 0}`).toLocaleString()}
    </Button>
  );
};
