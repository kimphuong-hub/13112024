import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosRequest } from '~/core/api';
import { FilterType } from '~/core/types';
import { typesAction, typesApi } from './const';

export const getAllocationItems = createAsyncThunk(
  typesAction.GET_ALLOCATION_ITEMS_ACTION,
  async (payload: FilterType) => {
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

    const response = await axiosRequest.get(`${typesApi.GET_ALLOCATION_ITEMS_API}?${queryString}`);
    return response;
  }
);

export const getAllocationItemsDetail = createAsyncThunk(
  typesAction.GET_ALLOCATION_ITEMS_DETAIL_ACTION,
  async (payload: { status: string; companyNo: string; toDate?: string; fromDate?: string } & FilterType) => {
    const { status = '', companyNo, toDate = '', fromDate = '', sort: sortModel, pagination, search = '' } = payload;
    const { sort = 'asc', field = '' } = sortModel?.[0] || {};
    const { page = 0, pageSize = 1000 } = pagination || {};

    const fieldsStatus = {
      checked: 'checked',
      allocation1: 'allocation1',
      allocation2: 'allocation2',
      verification: 'verification'
    };

    const queryParams = new URLSearchParams();
    queryParams.append('group_no', companyNo);
    queryParams.append('status', fieldsStatus[status as keyof typeof fieldsStatus]);
    queryParams.append('to_date', toDate);
    queryParams.append('from_date', fromDate);
    queryParams.append('keyword', search);
    queryParams.append('page_size', `${pageSize}`);
    queryParams.append('page_current', `${page + 1}`);
    queryParams.append('sort', field);
    queryParams.append('sort_direction', `${sort === 'asc' ? 1 : 0}`);

    const queryString = queryParams.toString();

    const response = await axiosRequest.get(`${typesApi.GET_ALLOCATION_ITEMS_DETAIL_API}?${queryString}`);
    return response;
  }
);

export const saveAllocationItemsDetail = createAsyncThunk(
  typesAction.SAVE_ALLOCATION_ITEMS_DETAIL_ACTION,
  async (payload: {
    status: string;
    company_no: string;
    data: {
      id: string;
      invoice_id: number;
      invoice_position_id: number;
      account_id: string;
      account_no: string;
      system_account_id: string | 0;
      system_account_no: string | 0;
    }[];
  }) => {
    const response = await axiosRequest.post(`${typesApi.SAVE_ALLOCATION_ITEMS_DETAIL_API}`, payload);
    return response;
  }
);

export const getAllocationInvoiceImages = createAsyncThunk(
  typesAction.GET_ALLOCATION_INVOICE_IMAGES_ACTION,
  async (itemName: string) => {
    const queryParams = new URLSearchParams();
    queryParams.append('item_name', itemName);

    const queryString = queryParams.toString();

    const response = await axiosRequest.get(`${typesApi.GET_ALLOCATION_INVOICE_IMAGES_API}?${queryString}`);
    return response;
  }
);
