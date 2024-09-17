import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosRequest } from '~/core/api';
import { typesAction, typesApi } from './const';

export const getItemsHistory = createAsyncThunk(
  typesAction.GET_ITEMS_HISTORY_ACTION,
  async (payload: { group_nr: string | number; items: { item_name: string; item_vat?: number }[] }) => {
    const response = await axiosRequest.post(`${typesApi.GET_ITEMS_HISTORY_API}`, payload);
    return response;
  }
);

export const getItemsByGroupAndAccount = createAsyncThunk(
  typesAction.GET_ITEMS_BY_GROUP_AND_ACCOUNT_ACTION,
  async (payload: { companyNo: string | number; accountNo: string | number }) => {
    const { companyNo, accountNo } = payload;

    const queryParams = new URLSearchParams();
    queryParams.append('group_no', `${companyNo}`);
    queryParams.append('account_no', `${accountNo}`);

    const queryString = queryParams.toString();

    const response = await axiosRequest.get(`${typesApi.GET_ITEMS_BY_GROUP_AND_ACCOUNT_API}?${queryString}`);
    return response;
  }
);
