import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosRequest } from '~/core/api';
import { FilterType } from '~/core/types';
import { typesAction, typesApi } from './const';

export const getCommonConfiguration = createAsyncThunk(typesAction.GET_CONFIGURATION_ACTION, async () => {
  const response = await axiosRequest.get(`${typesApi.GET_CONFIGURATION_API}`);
  return response;
});

export const saveCommonConfiguration = createAsyncThunk(
  typesAction.SAVE_CONFIGURATION_ACTION,
  async (payload: { theme: string | null; language: string | null } & FilterType) => {
    const { theme = 'dark', language = 'en' } = payload;

    const queryParams = new URLSearchParams();
    queryParams.append('theme', `${theme}`);
    queryParams.append('language', `${language}`);

    const queryString = queryParams.toString();

    const response = await axiosRequest.post(`${typesApi.SAVE_CONFIGURATION_API}?${queryString}`);
    return response;
  }
);
