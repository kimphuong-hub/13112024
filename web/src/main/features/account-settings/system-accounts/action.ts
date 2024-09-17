import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosRequest } from '~/core/api';
import { typesAction, typesApi } from './const';

export const getSystemAccounts = createAsyncThunk(typesAction.GET_SYSTEM_ACCOUNTS_ACTION, async () => {
  const response = await axiosRequest.get(`${typesApi.GET_SYSTEM_ACCOUNTS_API}`);
  return response;
});

export const getSystemAccountsDetail = createAsyncThunk(
  typesAction.GET_SYSTEM_ACCOUNTS_DETAIL_ACTION,
  async (payload: { systemAccountId: string }) => {
    const { systemAccountId } = payload;

    const queryParams = new URLSearchParams();
    queryParams.append('system_account_ref', systemAccountId);

    const queryString = queryParams.toString();

    const response = await axiosRequest.get(`${typesApi.GET_SYSTEM_ACCOUNTS_DETAIL_API}?${queryString}`);
    return response;
  }
);

export const getSystemAccountsByCompanyNo = createAsyncThunk(
  typesAction.GET_SYSTEM_ACCOUNTS_BY_COMPANY_NO_ACTION,
  async (payload: { companyNo: string }) => {
    const { companyNo } = payload;

    const queryParams = new URLSearchParams();
    queryParams.append('company_no', companyNo);

    const queryString = queryParams.toString();

    const response = await axiosRequest.get(`${typesApi.GET_SYSTEM_ACCOUNTS_BY_COMPANY_NO_API}?${queryString}`);
    return response;
  }
);

export const createSystemAccount = createAsyncThunk(
  typesAction.CREATE_SYSTEM_ACCOUNTS_ACTION,
  async (payload: {
    account_no: number;
    account_name_en: string;
    account_name_vn: string;
    account_name_de: string;
    parent_account_id: string | null;
    parent_account_no: string | null;
  }) => {
    const response = await axiosRequest.post(`${typesApi.CREATE_SYSTEM_ACCOUNTS_API}`, payload);
    return response;
  }
);

export const deleteSystemAccount = createAsyncThunk(typesAction.DELETE_SYSTEM_ACCOUNTS_ACTION, async (id: string) => {
  const response = await axiosRequest.delete(`${typesApi.DELETE_SYSTEM_ACCOUNTS_API}?id=${id}`);
  return response;
});
