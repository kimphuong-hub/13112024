import { createSlice } from '@reduxjs/toolkit';
import { getSystemAccounts, getSystemAccountsDetail } from './action';
import { mappingSystemAccountDetailsResponse, mappingSystemAccountsResponse } from './model';
import { SystemAccountsState } from './types';

const initialState: SystemAccountsState = {
  system: { data: [], status: 'hasValue' },
  details: {}
};

export const initialDetails = {
  data: [],
  status: 'hasValue'
};

export const systemAccountsSlice = createSlice({
  name: 'systemAccountsSlice',
  initialState,
  reducers: {
    setSystemAccountDetailsItemById: (
      state,
      action: {
        payload: {
          id: string;
          data: { accountId: string; systemAccountRef?: string };
        };
      }
    ) => {
      const { id, data } = action.payload;
      if (state.details[id].data) {
        const { accountId, ...restData } = data;
        const findIndex = state.details[id].data.findIndex((item) => item.id === accountId);
        if (findIndex > -1) {
          state.details[id].data[findIndex] = { ...state.details[id].data[findIndex], ...restData };
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSystemAccounts.pending, (state) => {
        state.system.status = 'loading';
      })
      .addCase(getSystemAccounts.fulfilled, (state, action) => {
        // api returns 404 when there is no data, but success return with other structure?
        // so we need to check status code
        if (!Array.isArray(action.payload.data)) {
          state.system.data = [];
          state.system.status = 'hasValue';
          return;
        }

        state.system.data = mappingSystemAccountsResponse(action.payload.data || []);
        state.system.status = 'hasValue';
      })
      .addCase(getSystemAccounts.rejected, (state) => {
        state.system.status = 'hasError';
      });
    builder
      .addCase(getSystemAccountsDetail.pending, (state, action) => {
        const { systemAccountId } = action.meta.arg;

        state.details[systemAccountId] = {
          ...(state.details[systemAccountId] || initialDetails),
          status: 'loading'
        };
      })
      .addCase(getSystemAccountsDetail.fulfilled, (state, action) => {
        const { systemAccountId } = action.meta.arg;

        if (!Array.isArray(action.payload.data.data)) {
          state.details[systemAccountId].data = [];
          state.details[systemAccountId].status = 'hasValue';
          return;
        }

        state.details[systemAccountId] = {
          ...(state.details[systemAccountId] || initialDetails),
          data: mappingSystemAccountDetailsResponse(action.payload.data.data) || [],
          status: 'hasValue'
        };
      })
      .addCase(getSystemAccountsDetail.rejected, (state, action) => {
        const { systemAccountId } = action.meta.arg;

        state.details[systemAccountId] = {
          ...(state.details[systemAccountId] || initialDetails),
          status: 'hasError'
        };
      });
  }
});

export const systemAccountsAction = systemAccountsSlice.actions;
export default systemAccountsSlice.reducer;
