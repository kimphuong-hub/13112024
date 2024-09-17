import { LineChart, lineElementClasses } from '@mui/x-charts';
import moment from 'moment';
import { useCallback, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import View from '~/base/components/Material/View';
import { getDashboardItemsTrend } from '~/main/features/dashboard/action';
import { useDispatchApp, useSelectorApp } from '~/redux/store';

const TabItemsTrend = () => {
  const [searchParams] = useSearchParams();
  const toDate = searchParams.get('to-date') || moment().format('YYYY-MM-DD');
  const fromDate = searchParams.get('from-date') || moment().day(-7).format('YYYY-MM-DD');

  const dispatch = useDispatchApp();
  const { itemsTrend: defaultItemsTrend } = useSelectorApp((state) => state.dashboard);
  const { data: itemsTrend } = defaultItemsTrend || {};

  const getData = useCallback(() => {
    dispatch(getDashboardItemsTrend({ toDate, fromDate }));
  }, [dispatch, fromDate, toDate]);

  useEffect(() => {
    getData();
  }, [getData]);

  const xAxisData = useMemo(() => {
    if (itemsTrend.length > 0) {
      return itemsTrend.map((item) => item.date);
    }

    const dataXAxis = [];
    const currentDate = moment(fromDate);

    while (currentDate.isSameOrBefore(toDate)) {
      dataXAxis.push(currentDate.format('YYYY-MM-DD'));
      currentDate.add(1, 'days');
    }

    return dataXAxis;
  }, [fromDate, itemsTrend, toDate]);

  const seriesData = useMemo(() => {
    if (itemsTrend.length > 0) {
      return itemsTrend.map((item) => item.totalItems);
    }

    const dataSeries = [];
    const currentDate = moment(fromDate);

    while (currentDate.isSameOrBefore(toDate)) {
      dataSeries.push(0);
      currentDate.add(1, 'days');
    }

    return dataSeries;
  }, [fromDate, itemsTrend, toDate]);

  return (
    <View flexGrow={1}>
      <LineChart
        sx={{ [`& .${lineElementClasses.root}`]: { strokeWidth: 4 } }}
        height={300}
        xAxis={[{ data: xAxisData, scaleType: 'point' }]}
        yAxis={[{ data: [0, 500, 1000, 1500, 2000], valueFormatter: (value) => `${value}` }]}
        series={[{ id: 'Current', data: seriesData, color: '#0E6027', curve: 'linear', showMark: false }]}
      />
    </View>
  );
};

export default TabItemsTrend;
