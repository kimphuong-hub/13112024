import { createSlice } from '@reduxjs/toolkit';
import { getUsers } from './action';
import { UsersState } from './types';
import { mappingUsersResponse } from './model';
import { GridSortModel } from '@mui/x-data-grid';

const initialState: UsersState = {
  users: {
    data: { rows: [], total: 0 },
    status: 'hasValue',
    sort: null,
    filter: [],
    pagination: { page: 0, pageSize: 25 }
  }
};

export const usersSlice = createSlice({
  name: 'usersSlice',
  initialState,
  reducers: {
    setUsersSort: (state, action: { payload: GridSortModel }) => {
      const fields = {
        name: 'name',
        email: 'email'
      };

      const sortModel = action.payload.map((item) => ({
        sort: item.sort,
        field: fields[item.field as keyof typeof fields]
      }));

      state.users.sort = sortModel;
    },
    setUsersPagination: (state, action) => {
      state.users.pagination = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.users = { ...state.users, status: 'loading' };
      })
      .addCase(getUsers.fulfilled, (state) => {
        state.users = {
          data: {
            rows: mappingUsersResponse([]),
            total: 0
          },
          status: 'hasValue'
        };
      })
      .addCase(getUsers.rejected, (state) => {
        state.users = { ...state.users, status: 'hasError' };
      });
  }
});

export const usersAction = usersSlice.actions;
export default usersSlice.reducer;
