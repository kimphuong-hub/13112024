import { GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import DataGrid from '~/base/components/Material/DataGrid';
import View from '~/base/components/Material/View';
import Section from '~/base/components/Material/View/Section';
import LayoutWrapper from '~/base/layout/Wrapper';
import { allocationArchivesAction } from '~/main/features/allocation/archives/slice';
import { useDispatchApp, useSelectorApp } from '~/redux/store';
import TopBar from './TopBar';
import { useColumns } from './common/columns';
import { FormAction } from './components/FormAction';
import { FormFilter } from './components/FormFilter';
import { getAllocationArchives } from '~/main/features/allocation/archives/action';
import moment from 'moment';

const AllocationArchivesListScreen = () => {
  const { t } = useTranslation();

  const [searchParams] = useSearchParams();
  const searchValue = searchParams.get('q') || '';

  const group = searchParams.get('group') || '0';
  const toDate = searchParams.get('to-date') || moment().format('YYYY-MM-DD');
  const fromDate = searchParams.get('from-date') || moment().day(-7).format('YYYY-MM-DD');

  const dispatch = useDispatchApp();
  const {
    data: { rows: allocationArchives = [], total },
    status,
    sort,
    pagination
  } = useSelectorApp((state) => state.allocation.archives.archives);

  const [openFilter, setOpenFilter] = useState(false);

  const getData = useCallback(() => {
    dispatch(
      getAllocationArchives({
        sort,
        pagination,
        search: searchValue,
        companyNo: group,
        toDate: toDate,
        fromDate: fromDate
      })
    );
  }, [dispatch, fromDate, group, pagination, searchValue, sort, toDate]);

  useEffect(() => {
    getData();
  }, [getData]);

  const onSortModelChange = useCallback(
    (model: GridSortModel) => {
      dispatch(allocationArchivesAction.setArchivesSort(model));
    },
    [dispatch]
  );

  const onPaginationModelChange = useCallback(
    (model: GridPaginationModel) => {
      dispatch(allocationArchivesAction.setArchivesPagination(model));
    },
    [dispatch]
  );

  return (
    <LayoutWrapper
      title={t('app.title.allocation.archives')}
      breadcrumbs={{
        title: t('app.breadcrumb.allocation'),
        rightComponent: <FormAction onToggleFilter={() => setOpenFilter(!openFilter)} />,
        bottomComponent: <FormFilter open={openFilter} onClose={() => setOpenFilter(false)} />
      }}
    >
      <View p='20px' flexGrow={1}>
        <Section flexGrow={1} gap={1}>
          <TopBar />
          <DataGrid
            name='allocation.archives'
            rows={allocationArchives}
            rowCount={total}
            columns={useColumns(t)}
            getRowId={(row) => row.companyNo}
            loading={status === 'loading'}
            initialState={{
              pagination: { paginationModel: { page: pagination?.page, pageSize: pagination?.pageSize } }
            }}
            sortingMode='server'
            onSortModelChange={onSortModelChange}
            paginationMode='server'
            onPaginationModelChange={onPaginationModelChange}
          />
        </Section>
      </View>
    </LayoutWrapper>
  );
};

export default AllocationArchivesListScreen;
