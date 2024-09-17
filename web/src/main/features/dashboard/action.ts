import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosRequest } from '~/core/api';
import { typesAction, typesApi } from './const';

export const getDashboardItemsTrend = createAsyncThunk(
  typesAction.GET_ITEMS_TREND_ACTION,
  async (payload: { toDate?: string; fromDate?: string }) => {
    const { toDate = '', fromDate = '' } = payload;

    const queryParams = new URLSearchParams();
    queryParams.append('to_date', toDate);
    queryParams.append('from_date', fromDate);

    const queryString = queryParams.toString();

    const response = await axiosRequest.get(`${typesApi.GET_ITEMS_TREND_API}?${queryString}`);
    return response;
  }
);

export const getDashboardInvoiceOverview = createAsyncThunk(
  typesAction.GET_INVOICE_OVERVIEW_ACTION,
  async (payload: { toDate?: string; fromDate?: string }) => {
    const { toDate = '', fromDate = '' } = payload;

    const queryParams = new URLSearchParams();
    queryParams.append('to_date', toDate);
    queryParams.append('from_date', fromDate);

    const queryString = queryParams.toString();

    const response = await axiosRequest.get(`${typesApi.GET_INVOICE_OVERVIEW_API}?${queryString}`);
    return response;
  }
);

export const getDashboardInvoiceItemsOverview = createAsyncThunk(
  typesAction.GET_INVOICE_ITEMS_OVERVIEW_ACTION,
  async (payload: { toDate?: string; fromDate?: string }) => {
    const { toDate = '', fromDate = '' } = payload;

    const queryParams = new URLSearchParams();
    queryParams.append('to_date', toDate);
    queryParams.append('from_date', fromDate);

    const queryString = queryParams.toString();

    const response = await axiosRequest.get(`${typesApi.GET_INVOICE_ITEMS_OVERVIEW_API}?${queryString}`);
    return response;
  }
);
