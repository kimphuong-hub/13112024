import { createSlice } from '@reduxjs/toolkit';
import { getDashboardInvoiceItemsOverview, getDashboardInvoiceOverview, getDashboardItemsTrend } from './action';
import {
  mappingInvoiceItemsOverviewResponse,
  mappingInvoicesOverviewResponse,
  mappingItemsTrendResponse
} from './model';
import { DashBoardState } from './types';

const initialState: DashBoardState = {
  itemsTrend: {
    data: [],
    status: 'hasValue'
  },
  invoicesOverview: {
    data: [],
    status: 'hasValue'
  },
  invoicesItemsOverview: {
    data: {},
    status: 'hasValue'
  }
};

export const dashboardSlice = createSlice({
  name: 'groupsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDashboardItemsTrend.pending, (state) => {
        state.itemsTrend.status = 'loading';
      })
      .addCase(getDashboardItemsTrend.fulfilled, (state, action) => {
        state.itemsTrend.data = mappingItemsTrendResponse(action.payload.data.data || []);
        state.itemsTrend.status = 'hasValue';
      })
      .addCase(getDashboardItemsTrend.rejected, (state) => {
        state.itemsTrend.status = 'hasError';
      });
    builder
      .addCase(getDashboardInvoiceOverview.pending, (state) => {
        state.invoicesOverview.status = 'loading';
      })
      .addCase(getDashboardInvoiceOverview.fulfilled, (state, action) => {
        state.invoicesOverview.data = mappingInvoicesOverviewResponse(action.payload.data.data || []);
        state.invoicesOverview.status = 'hasValue';
      })
      .addCase(getDashboardInvoiceOverview.rejected, (state) => {
        state.invoicesOverview.status = 'hasError';
      });
    builder
      .addCase(getDashboardInvoiceItemsOverview.pending, (state) => {
        state.invoicesItemsOverview.status = 'loading';
      })
      .addCase(getDashboardInvoiceItemsOverview.fulfilled, (state, action) => {
        state.invoicesItemsOverview.data = mappingInvoiceItemsOverviewResponse(action.payload.data.data || {});
        state.invoicesItemsOverview.status = 'hasValue';
      })
      .addCase(getDashboardInvoiceItemsOverview.rejected, (state) => {
        state.invoicesItemsOverview.status = 'hasError';
      });
  }
});

export const dashboardAction = dashboardSlice.actions;
export default dashboardSlice.reducer;
