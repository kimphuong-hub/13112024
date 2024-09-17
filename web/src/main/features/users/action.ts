import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosRequest } from '~/core/api';
import { typesAction, typesApi } from './const';
import { FilterType } from '~/core/types';

export const getUsers = createAsyncThunk(typesAction.GET_USERS_ACTION, async (payload: FilterType) => {
  const { sort: sortModel, pagination, search = '' } = payload;
  const { sort = 'asc', field = '' } = sortModel?.[0] || {};
  const { page = 0, pageSize = 50 } = pagination || {};

  const queryParams = new URLSearchParams();
  queryParams.append('keyword', search);
  queryParams.append('page_size', `${pageSize}`);
  queryParams.append('page_current', `${page + 1}`);
  queryParams.append('sort', field);
  queryParams.append('sort_direction', `${sort === 'asc' ? 1 : 0}`);

  const queryString = queryParams.toString();

  const response = await axiosRequest.get(`${typesApi.GET_USERS_API}?${queryString}`);
  return response;
});
