import { GridFilterModel, GridSortModel } from '@mui/x-data-grid';
import { createSlice } from '@reduxjs/toolkit';
import { mappingAllocationItemsDetailsResponse } from '../items/model';
import { getAllocationArchives, getAllocationArchivesDetail } from './action';
import { mappingAllocationArchivesResponse } from './model';
import { AllocationArchivesState } from './types';

const initialState: AllocationArchivesState = {
  archives: {
    data: { rows: [], total: 0 },
    status: 'hasValue',
    sort: null,
    filter: [],
    pagination: { page: 0, pageSize: 25 }
  },
  details: {}
};

export const initialStateDetails = { data: [], status: 'hasValue' };

export const allocationArchivesSlice = createSlice({
  name: 'allocationArchivesSlice',
  initialState,
  reducers: {
    setArchivesSort: (state, action: { payload: GridSortModel }) => {
      const fields = {
        reseller: 'reseller',
        companyNo: 'company_no',
        companyName: 'company_name',
        invoices: 'invoices',
        items: 'items',
        defaultAllocation: 'default_allocation',
        lastAllocation: 'last_allocation',
        newItems: 'new_items'
      };

      const sortModel = action.payload.map((item) => ({
        sort: item.sort,
        field: fields[item.field as keyof typeof fields] ?? item.field
      }));

      state.archives.sort = sortModel;
    },
    setArchivesFilter: (state, action: { payload: GridFilterModel }) => {
      state.archives.filter = action.payload.items;
    },
    setArchivesPagination: (state, action) => {
      state.archives.pagination = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllocationArchives.pending, (state) => {
        state.archives.status = 'loading';
      })
      .addCase(getAllocationArchives.fulfilled, (state, action) => {
        state.archives.data.rows = mappingAllocationArchivesResponse(action.payload.data.data || []);
        state.archives.data.total = action.payload.data.totalRecords || 0;
        state.archives.status = 'hasValue';
      })
      .addCase(getAllocationArchives.rejected, (state) => {
        state.archives.status = 'hasError';
      });
    builder
      .addCase(getAllocationArchivesDetail.pending, (state, action) => {
        const { companyNo } = action.meta.arg;

        state.details[companyNo] = {
          ...(state.details[companyNo] || initialStateDetails),
          status: 'loading'
        };
      })
      .addCase(getAllocationArchivesDetail.fulfilled, (state, action) => {
        const { companyNo } = action.meta.arg;

        state.details[companyNo] = {
          ...(state.details[companyNo] || initialStateDetails),
          data: mappingAllocationItemsDetailsResponse(action.payload.data.data || []),
          companyNo: action.payload.data.company_no,
          companyName: action.payload.data.company_name,
          status: 'hasValue'
        };
      })
      .addCase(getAllocationArchivesDetail.rejected, (state, action) => {
        const { companyNo } = action.meta.arg;

        state.details[companyNo] = {
          ...(state.details[companyNo] || initialStateDetails),
          status: 'hasError'
        };
      });
  }
});

export const allocationArchivesAction = allocationArchivesSlice.actions;
export default allocationArchivesSlice.reducer;
