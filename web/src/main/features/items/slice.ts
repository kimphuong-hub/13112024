import { createSlice } from '@reduxjs/toolkit';
import { ItemsState } from './types';
import { getItemsHistory } from './action';
import { mappingItemsHistoriesResponse } from './model';

const initialState: ItemsState = {
  history: {}
};

export const initialStateItemsHistoryDrawer = { data: [], status: 'hasValue' };

export const itemsSlice = createSlice({
  name: 'itemsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getItemsHistory.pending, (state, action) => {
        const { group_nr } = action.meta.arg;

        state.history[group_nr] = {
          ...(state.history[group_nr] || initialStateItemsHistoryDrawer),
          status: 'loading'
        };
      })
      .addCase(getItemsHistory.fulfilled, (state, action) => {
        const { group_nr } = action.meta.arg;

        state.history[group_nr] = {
          ...(state.history[group_nr] || initialStateItemsHistoryDrawer),
          data: mappingItemsHistoriesResponse(action.payload.data?.data?.items?.[0]?.accounts || []),
          status: 'hasValue'
        };
      })
      .addCase(getItemsHistory.rejected, (state, action) => {
        const { group_nr } = action.meta.arg;

        state.history[group_nr] = {
          ...(state.history[group_nr] || initialStateItemsHistoryDrawer),
          status: 'hasError'
        };
      });
  }
});

export const itemsAction = itemsSlice.actions;
export default itemsSlice.reducer;
