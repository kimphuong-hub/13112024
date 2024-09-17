import { createAsyncThunk } from '@reduxjs/toolkit';
import moment from 'moment';
import { axiosRequest } from '~/core/api';
import { FilterType } from '~/core/types';
import { typesAction, typesApi } from './const';

export const getAllocationArchives = createAsyncThunk(
  typesAction.GET_ALLOCATION_ARCHIVES_ACTION,
  async (payload: { companyNo: string; fromDate: string; toDate: string } & FilterType) => {
    const {
      sort: sortModel,
      pagination,
      search = '',
      companyNo = '0',
      fromDate = moment().format('YYYY-MM-DD'),
      toDate = moment().format('YYYY-MM-DD')
    } = payload;
    const { sort = 'asc', field = '' } = sortModel?.[0] || {};
    const { page = 0, pageSize = 50 } = pagination || {};

    const queryParams = new URLSearchParams();
    queryParams.append('company_no', companyNo);
    queryParams.append('from_date', fromDate);
    queryParams.append('to_date', toDate);
    queryParams.append('keyword', search);
    queryParams.append('page_size', `${pageSize}`);
    queryParams.append('page_current', `${page + 1}`);
    queryParams.append('sort', field);
    queryParams.append('sort_direction', `${sort === 'asc' ? 1 : 0}`);

    const queryString = queryParams.toString();

    const response = await axiosRequest.get(`${typesApi.GET_ALLOCATION_ARCHIVES_API}?${queryString}`);
    return response;
  }
);

export const getAllocationArchivesDetail = createAsyncThunk(
  typesAction.GET_ALLOCATION_ARCHIVES_DETAIL_ACTION,
  async (payload: { companyNo: string; toDate?: string; fromDate?: string } & FilterType) => {
    const { companyNo, toDate = '', fromDate = '', sort: sortModel, pagination, search = '' } = payload;
    const { sort = 'asc', field = '' } = sortModel?.[0] || {};
    const { page = 0, pageSize = 1000 } = pagination || {};

    const queryParams = new URLSearchParams();
    queryParams.append('group_no', companyNo);
    queryParams.append('to_date', toDate);
    queryParams.append('from_date', fromDate);
    queryParams.append('keyword', search);
    queryParams.append('page_size', `${pageSize}`);
    queryParams.append('page_current', `${page + 1}`);
    queryParams.append('sort', field);
    queryParams.append('sort_direction', `${sort === 'asc' ? 1 : 0}`);

    const queryString = queryParams.toString();

    const response = await axiosRequest.get(`${typesApi.GET_ALLOCATION_ARCHIVES_DETAIL_API}?${queryString}`);
    return response;
  }
);
