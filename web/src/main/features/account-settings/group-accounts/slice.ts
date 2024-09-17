import { GridFilterModel, GridSortModel } from '@mui/x-data-grid';
import { createSlice } from '@reduxjs/toolkit';
import { findSubtreeById } from '~/core/tree/treeFuncs';
import { getSystemAccounts } from '../system-accounts/action';
import { mappingSystemAccountsResponse } from '../system-accounts/model';
import { getGroupAccountsDetail, getGroups, getGroupsAll } from './action';
import { mappingGroupDetailsResponse, mappingGroupsAllResponse, mappingGroupsResponse } from './model';
import { GroupDetailResponse, GroupsState, SetGroupDetailPayload } from './types';

const initialState: GroupsState = {
  groups: {
    data: { rows: [], total: 0 },
    status: 'hasValue',
    sort: null,
    filter: [],
    pagination: { page: 0, pageSize: 25 }
  },
  details: {},
  systemAccounts: { data: [], status: 'hasValue' },
  groupsSelector: { data: [], status: 'hasValue' },
  allocationItemsDrawer: null
};

export const initialDetails = { data: [], status: 'hasValue' };

export const groupAccountsSlice = createSlice({
  name: 'groupAccountsSlice',
  initialState,
  reducers: {
    setGroupsSort: (state, action: { payload: GridSortModel }) => {
      const fields = {
        companyNo: 'company_no',
        name: 'name',
        partnerName: 'partner_name',
        totalAccount: 'total_account',
        totalAccountMapped: 'total_account_mapped',
        totalAccountUnMapped: 'total_account_unmapp',
        updatedAt: 'updated_at'
      };

      const sortModel = action.payload.map((item) => ({
        sort: item.sort,
        field: fields[item.field as keyof typeof fields]
      }));

      state.groups.sort = sortModel;
    },
    setGroupsFilter: (state, action: { payload: GridFilterModel }) => {
      state.groups.filter = action.payload.items;
    },
    setGroupsPagination: (state, action) => {
      state.groups.pagination = action.payload;
    },
    setGroupDetailsByPublicId: (state, action: { payload: SetGroupDetailPayload }) => {
      const { publicId, companyAccountId, systemAccountId } = action.payload;
      if (state.details[publicId].data) {
        const findDetailIndex = state.details[publicId].data.findIndex((item) => item.id === companyAccountId);
        if (findDetailIndex > -1) {
          const systemAccount = findSubtreeById(state.systemAccounts.data, `${systemAccountId}`);
          state.details[publicId].data[findDetailIndex] = {
            ...state.details[publicId].data[findDetailIndex],
            systemAccountNo: systemAccount?.accountNo || '',
            systemAccountName: systemAccount?.accountName || '',
            systemAccountRef: systemAccount?.id || ''
          };
        }
      }
    },
    setAllocationItemsDrawer: (state, action: { payload: GroupDetailResponse | null }) => {
      state.allocationItemsDrawer = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGroups.pending, (state) => {
        state.groups.status = 'loading';
      })
      .addCase(getGroups.fulfilled, (state, action) => {
        state.groups.data.rows = mappingGroupsResponse(action.payload.data.data || []);
        state.groups.data.total = action.payload.data.totalRecords || 0;
        state.groups.status = 'hasValue';
      })
      .addCase(getGroups.rejected, (state) => {
        state.groups.status = 'hasError';
      });
    builder
      .addCase(getGroupsAll.pending, (state) => {
        state.groupsSelector.status = 'loading';
      })
      .addCase(getGroupsAll.fulfilled, (state, action) => {
        state.groupsSelector.data = mappingGroupsAllResponse(action.payload.data.data || []);
        state.groupsSelector.status = 'hasValue';
      })
      .addCase(getGroupsAll.rejected, (state) => {
        state.groupsSelector.status = 'hasError';
      });
    builder
      .addCase(getGroupAccountsDetail.pending, (state, action) => {
        const { publicId } = action.meta.arg;

        state.details[publicId] = {
          ...(state.details[publicId] || initialDetails),
          status: 'loading'
        };
      })
      .addCase(getGroupAccountsDetail.fulfilled, (state, action) => {
        const { publicId } = action.meta.arg;

        state.details[publicId] = {
          ...(state.details[publicId] || initialDetails),
          data: mappingGroupDetailsResponse(action.payload.data.data || [], action.payload.data.company_no),
          companyNo: action.payload.data.company_no,
          companyName: action.payload.data.company_name,
          status: 'hasValue'
        };
      })
      .addCase(getGroupAccountsDetail.rejected, (state, action) => {
        const { publicId } = action.meta.arg;

        state.details[publicId] = {
          ...(state.details[publicId] || initialDetails),
          status: 'hasError'
        };
      });
    builder
      .addCase(getSystemAccounts.pending, (state) => {
        state.systemAccounts.status = 'loading';
      })
      .addCase(getSystemAccounts.fulfilled, (state, action) => {
        if (!Array.isArray(action.payload.data)) {
          state.systemAccounts.data = [];
          state.systemAccounts.status = 'hasValue';
          return;
        }

        state.systemAccounts.data = mappingSystemAccountsResponse(action.payload.data || []);
        state.systemAccounts.status = 'hasValue';
      })
      .addCase(getSystemAccounts.rejected, (state) => {
        state.systemAccounts.status = 'hasError';
      });
  }
});

export const groupAccountsAction = groupAccountsSlice.actions;
export default groupAccountsSlice.reducer;
