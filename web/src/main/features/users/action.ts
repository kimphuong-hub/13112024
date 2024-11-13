import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosRequest } from '~/core/api';
import { typesAction, typesApi } from './const';
import { FilterType } from '~/core/types';
import axios from 'axios';
import moment from 'moment';
import { FormValues } from '~/main/screens/Users/Users/NewUsers/common/form';
import { t } from 'i18next';

const API_URL = 'http://localhost:3001/groupAccounts';
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


export const fetchGroupAccounts = async (): Promise<any> => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching group accounts:', error);
    throw error; 
  }
};
export const fetchGroupAccountById = async (id: string | number): Promise<any> => {
  try {
    const response = await axios.get(`http://localhost:3001/groupAccounts/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi lấy dữ liệu với ID ${id}:`, error);
    throw error;
  }
};

export const saveUserData = async (groupAccounts: FormValues) => {
  try {
    const newGroupAccount = {
      ...groupAccounts,
      createddate: moment().format('YYYY-MM-DD'),
    };
    const response = await axios.post('http://localhost:3001/groupAccounts', newGroupAccount);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lưu dữ liệu:", error);
    throw error;
  }
};
export const checkEmailExists = async (email: string) => {
  try {
    const response = await axios.get(`http://localhost:3001/groupAccounts?email=${email}`);
    return response.data.length > 0;
  } catch (error) {
    console.error("Lỗi khi kiểm tra email:", error);
    throw error;
  }
};

export const updateUserData = async (id: any, updatedData: any) => {
  try {
    const currentResponse = await axios.get(`http://localhost:3001/groupAccounts/${id}`);
    const currentData = currentResponse.data;
    const dataToUpdate = {
      ...currentData,
      ...updatedData,
      createddate: currentData.createddate,
    };
    const response = await axios.put(`http://localhost:3001/groupAccounts/${id}`, dataToUpdate);
    return response.data; 
  } catch (error) {
    console.error("Lỗi khi cập nhật dữ liệu:", error);
    throw error;
  }
};
export const deleteUserData = async (id: any) => {
  const confirmDelete = window.confirm(t('app.system.remove'));
  if (!confirmDelete) {
    return;
  }
  try {
    const response = await axios.delete(`http://localhost:3001/groupAccounts/${id}`);
    if (response.status === 200) { 
      window.location.reload(); 
    }
  } catch (error) {
    console.error("Lỗi khi xóa dữ liệu:", error);
  }
};

export const fetchUsers = async (): Promise<any> => {
  try {
    const response = await axios.get('http://localhost:3001/SecurityRole');
    return response.data;
  } catch (error) {
    console.error('Error fetching group accounts:', error);
    throw error; 
  }
};