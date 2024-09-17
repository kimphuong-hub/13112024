import { createSlice } from '@reduxjs/toolkit';
import { i18nResources } from '~/core/i18n';
import { getCommonConfiguration } from './action';
import { objectToArray } from '~/core/commonFuncs';
import { CommonState } from './types';

const initialState: CommonState = {
  theme: null,
  language: null,
  status: 'hasValue'
};

export const commonSlice = createSlice({
  name: 'CommonSlice',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCommonConfiguration.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCommonConfiguration.fulfilled, (state, action) => {
        const data = action.payload.data;

        const theme = data.data?.theme;
        state.theme = ['dark', 'light'].includes(theme) ? theme : 'dark';

        const language = data.data?.language;
        const isMatchLanguage = objectToArray(i18nResources).some((item: { key: string }) => item.key === language);
        state.language = isMatchLanguage ? language : 'en';

        state.status = 'hasValue';
      })
      .addCase(getCommonConfiguration.rejected, (state) => {
        state.status = 'hasError';
      });
  }
});

export const commonAction = commonSlice.actions;
export default commonSlice.reducer;
