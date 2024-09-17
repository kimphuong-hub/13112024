import { GridRenderCellParams } from '@mui/x-data-grid';
import moment from 'moment';
import { useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '~/base/components/Material/Button';

export const CellTotal = (props: GridRenderCellParams) => {
  const {
    row: { companyNo: groupNr },
    value
  } = props;

  const navigation = useNavigate();
  const [searchParams] = useSearchParams();
  const toDate = searchParams.get('to-date') || moment().format('YYYY-MM-DD');
  const fromDate = searchParams.get('from-date') || moment().day(-7).format('YYYY-MM-DD');

  const onDoubleClick = useCallback(() => {
    const queryParams = new URLSearchParams();
    queryParams.append('to-date', toDate);
    queryParams.append('from-date', fromDate);

    const queryString = queryParams.toString();

    navigation(`/allocation/archives/update/${groupNr}?${queryString}`);
  }, [fromDate, groupNr, navigation, toDate]);

  return (
    <Button variant='text' onDoubleClick={value ? onDoubleClick : () => {}}>
      {Number(`${value || 0}`).toLocaleString()}
    </Button>
  );
};
