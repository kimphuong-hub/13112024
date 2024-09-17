import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosRequest } from '~/core/api';
import { typesAction, typesApi } from './const';
import { FilterType } from '~/core/types';

export const getGroups = createAsyncThunk(typesAction.GET_GROUPS_ACTION, async (payload: FilterType) => {
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

  const response = await axiosRequest.get(`${typesApi.GET_GROUPS_API}?${queryString}`);
  return response;
});

export const getGroupsAll = createAsyncThunk(typesAction.GET_GROUPS_ALL_ACTION, async () => {
  const response = await axiosRequest.get(`${typesApi.GET_GROUPS_ALL_API}`);
  return response;
});

export const getGroupAccountsDetail = createAsyncThunk(
  typesAction.GET_GROUPS_DETAIL_ACTION,
  async (payload: { publicId: string }) => {
    const { publicId } = payload;

    const queryParams = new URLSearchParams();
    queryParams.append('public_id', publicId);

    const queryString = queryParams.toString();

    const response = await axiosRequest.get(`${typesApi.GET_GROUPS_DETAIL_API}?${queryString}`);
    return response;
  }
);

export const getGroupAccountsByCompanyNo = createAsyncThunk(
  typesAction.GET_GROUPS_ACCOUNTS_BY_COMPANY_NO_ACTION,
  async (payload: { companyNo: string | number }) => {
    const { companyNo } = payload;

    const queryParams = new URLSearchParams();
    queryParams.append('company_no', `${companyNo}`);

    const queryString = queryParams.toString();

    const response = await axiosRequest.get(`${typesApi.GET_GROUPS_ACCOUNTS_BY_COMPANY_NO_API}?${queryString}`);
    return response;
  }
);

export const saveAccountsChecked = createAsyncThunk(
  typesAction.SAVE_ACCOUNTS_CHECKED_ACTION,
  async (payload: { id: string[]; company_no: string }) => {
    const response = await axiosRequest.post(`${typesApi.SAVE_ACCOUNTS_CHECKED_API}`, payload);
    return response;
  }
);

export const saveAccountsPlanMapping = createAsyncThunk(
  typesAction.SAVE_ACCOUNTS_PLAN_MAPPING_ACTION,
  async (payload: {
    company_no: string;
    company_accounting_plan_mapping: {
      account_no: string;
      system_account_no: string;
    }[];
  }) => {
    const response = await axiosRequest.post(`${typesApi.SAVE_ACCOUNTS_PLAN_MAPPING_API}`, payload);
    return response;
  }
);
