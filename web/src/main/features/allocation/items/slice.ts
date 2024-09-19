import { GridFilterModel, GridSortModel } from '@mui/x-data-grid';
import { createSlice } from '@reduxjs/toolkit';
import { getGroupAccountsByCompanyNo } from '../../account-settings/group-accounts/action';
import { mappingGroupAccountsResponse } from '../../account-settings/group-accounts/model';
import { getItemsByGroupAndAccount } from '../../items/action';
import { getAllocationItems, getAllocationItemsDetail } from './action';
import { mappingAllocationItemsDetailsResponse, mappingAllocationItemsResponse } from './model';
import { AllocationItemsState, SetAllocationItemsDetailPayload } from './types';
import {
  getSystemAccountsByCompanyNo,
  getSystemCompanyAccountsByCompanyNo
} from '../../account-settings/system-accounts/action';
import {
  mappingSystemAccountsResponse,
  mappingSystemCompanyAccountsResponse
} from '../../account-settings/system-accounts/model';

const initialState: AllocationItemsState = {
  items: {
    data: { rows: [], total: 0 },
    status: 'hasValue',
    sort: null,
    filter: [],
    pagination: { page: 0, pageSize: 25 }
  },
  details: {},
  groupAccountDrawer: { items: {}, accounts: {} },
  groupAccountOptions: {},
  systemAccountOptions: {},
  systemCompanyAccountOptions: {}
};

export const initialStateData = { data: [], status: 'hasValue' };
export const initialStateDetails = {
  data: [],
  companyNo: 0,
  companyName: '',
  status: 'hasValue'
};

export const allocationItemsSlice = createSlice({
  name: 'allocationItemsSlice',
  initialState,
  reducers: {
    setItemsSort: (state, action: { payload: GridSortModel }) => {
      const fields = {
        reseller: 'reseller',
        companyNo: 'company_no',
        companyName: 'company_name',
        invoices: 'invoices',
        items: 'items',
        defaultAllocation: 'default_allocation',
        lastAllocation: 'last_allocation',
        newItems: 'new_items',
        inProcess: 'in_process',
        checked: 'checked'
      };

      const sortModel = action.payload.map((item) => ({
        sort: item.sort,
        field: fields[item.field as keyof typeof fields]
      }));

      state.items.sort = sortModel;
    },
    setItemsFilter: (state, action: { payload: GridFilterModel }) => {
      state.items.filter = action.payload.items;
    },
    setItemsPagination: (state, action) => {
      state.items.pagination = action.payload;
    },
    setAllocationItemsDetailById: (state, action: { payload: SetAllocationItemsDetailPayload }) => {
      const {
        data: { id, details },
        params
      } = action.payload;

      if (!state.details[params.companyNo]) {
        state.details[params.companyNo] = {};
      }

      const detailsStatus = state.details[params.companyNo][params.status] || initialStateDetails;
      const findDetailIndex = detailsStatus.data.findIndex((item) => item.id === id);

      if (findDetailIndex > -1) {
        state.details[params.companyNo][params.status].data[findDetailIndex] = {
          ...state.details[params.companyNo][params.status].data[findDetailIndex],
          ...details
        };
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllocationItems.pending, (state) => {
        state.items.status = 'loading';
      })
      .addCase(getAllocationItems.fulfilled, (state, action) => {
        state.items.data.rows = mappingAllocationItemsResponse(action.payload.data.data || []);
        state.items.data.total = action.payload.data.totalRecords || 0;
        state.items.status = 'hasValue';
      })
      .addCase(getAllocationItems.rejected, (state) => {
        state.items.status = 'hasError';
      });
    builder
      .addCase(getAllocationItemsDetail.pending, (state, action) => {
        const { status, companyNo } = action.meta.arg;

        if (!state.details[companyNo]) {
          state.details[companyNo] = {};
        }

        state.details[companyNo][status] = {
          ...initialStateDetails,
          ...state.details[companyNo][status],
          status: 'loading'
        };
      })
      .addCase(getAllocationItemsDetail.fulfilled, (state, action) => {
        const { status, companyNo } = action.meta.arg;

        if (!state.details[companyNo]) {
          state.details[companyNo] = {};
        }

        state.details[companyNo][status] = {
          ...initialStateDetails,
          ...state.details[companyNo][status],
          data: mappingAllocationItemsDetailsResponse(action.payload.data.data || []),
          companyNo: action.payload.data.company_no,
          companyName: action.payload.data.company_name,
          status: 'hasValue'
        };
      })
      .addCase(getAllocationItemsDetail.rejected, (state, action) => {
        const { status, companyNo } = action.meta.arg;

        if (!state.details[companyNo]) {
          state.details[companyNo] = {};
        }

        state.details[companyNo][status] = {
          ...initialStateDetails,
          ...state.details[companyNo][status],
          status: 'hasError'
        };
      });
    builder
      .addCase(getGroupAccountsByCompanyNo.pending, (state, action) => {
        const { companyNo } = action.meta.arg;

        state.groupAccountOptions[companyNo] = {
          ...initialStateData,
          ...state.groupAccountOptions[companyNo],
          status: 'loading'
        };

        state.groupAccountDrawer.accounts[companyNo] = {
          ...initialStateData,
          ...state.groupAccountDrawer.accounts[companyNo],
          status: 'loading'
        };
      })
      .addCase(getGroupAccountsByCompanyNo.fulfilled, (state, action) => {
        const { companyNo } = action.meta.arg;

        state.groupAccountOptions[companyNo] = {
          ...initialStateData,
          ...state.groupAccountOptions[companyNo],
          data: mappingGroupAccountsResponse(action.payload.data.data || []),
          status: 'hasValue'
        };

        state.groupAccountDrawer.accounts[companyNo] = {
          ...initialStateData,
          ...state.groupAccountDrawer.accounts[companyNo],
          data: mappingGroupAccountsResponse(action.payload.data.data || []),
          status: 'hasValue'
        };
      })
      .addCase(getGroupAccountsByCompanyNo.rejected, (state, action) => {
        const { companyNo } = action.meta.arg;

        state.groupAccountOptions[companyNo] = {
          ...initialStateData,
          ...state.groupAccountOptions[companyNo],
          status: 'hasError'
        };

        state.groupAccountDrawer.accounts[companyNo] = {
          ...initialStateData,
          ...state.groupAccountDrawer.accounts[companyNo],
          status: 'hasError'
        };
      });
    builder
      .addCase(getSystemAccountsByCompanyNo.pending, (state, action) => {
        const { companyNo } = action.meta.arg;

        state.systemAccountOptions[companyNo] = {
          ...initialStateData,
          ...state.systemAccountOptions[companyNo],
          status: 'loading'
        };
      })
      .addCase(getSystemAccountsByCompanyNo.fulfilled, (state, action) => {
        const { companyNo } = action.meta.arg;

        // api wrong, not defined correct
        if (!Array.isArray(action.payload.data)) {
          state.systemAccountOptions[companyNo] = {
            ...initialStateData,
            ...state.systemAccountOptions[companyNo],
            data: [],
            status: 'hasValue'
          };
          return;
        }

        state.systemAccountOptions[companyNo] = {
          ...initialStateData,
          ...state.systemAccountOptions[companyNo],
          data: mappingSystemAccountsResponse(action.payload.data || []),
          status: 'hasValue'
        };
      })
      .addCase(getSystemAccountsByCompanyNo.rejected, (state, action) => {
        const { companyNo } = action.meta.arg;

        state.systemAccountOptions[companyNo] = {
          ...initialStateData,
          ...state.systemAccountOptions[companyNo],
          status: 'hasError'
        };
      });
    builder
      .addCase(getSystemCompanyAccountsByCompanyNo.pending, (state, action) => {
        const { companyNo } = action.meta.arg;

        state.systemCompanyAccountOptions[companyNo] = {
          ...initialStateData,
          ...state.systemCompanyAccountOptions[companyNo],
          status: 'loading'
        };
      })
      .addCase(getSystemCompanyAccountsByCompanyNo.fulfilled, (state, action) => {
        const { companyNo } = action.meta.arg;

        state.systemCompanyAccountOptions[companyNo] = {
          ...initialStateData,
          ...state.systemCompanyAccountOptions[companyNo],
          data: mappingSystemCompanyAccountsResponse(action.payload.data || []),
          status: 'hasValue'
        };
      })
      .addCase(getSystemCompanyAccountsByCompanyNo.rejected, (state, action) => {
        const { companyNo } = action.meta.arg;

        state.systemCompanyAccountOptions[companyNo] = {
          ...initialStateData,
          ...state.systemCompanyAccountOptions[companyNo],
          status: 'hasError'
        };
      });
    builder
      .addCase(getItemsByGroupAndAccount.pending, (state, action) => {
        const { companyNo, accountNo } = action.meta.arg;

        if (!state.groupAccountDrawer.items[companyNo]) {
          state.groupAccountDrawer.items[companyNo] = {};
        }

        state.groupAccountDrawer.items[companyNo][accountNo] = {
          ...initialStateData,
          ...state.groupAccountDrawer.items[companyNo][accountNo],
          status: 'loading'
        };
      })
      .addCase(getItemsByGroupAndAccount.fulfilled, (state, action) => {
        const { companyNo, accountNo } = action.meta.arg;

        state.groupAccountDrawer.items[companyNo][accountNo] = {
          ...initialStateData,
          ...state.groupAccountDrawer.items[companyNo][accountNo],
          data: mappingAllocationItemsDetailsResponse(action.payload.data.data || []),
          status: 'hasValue'
        };
      })
      .addCase(getItemsByGroupAndAccount.rejected, (state, action) => {
        const { companyNo, accountNo } = action.meta.arg;

        state.groupAccountDrawer.items[companyNo][accountNo] = {
          ...initialStateData,
          ...state.groupAccountDrawer.items[companyNo][accountNo],
          status: 'hasError'
        };
      });
  }
});

export const allocationItemsAction = allocationItemsSlice.actions;
export default allocationItemsSlice.reducer;
