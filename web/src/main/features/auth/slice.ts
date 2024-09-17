import { createSlice } from '@reduxjs/toolkit';
import { login, refreshToken } from './action';
import { ProfileType } from './types';

export type UsersState = {
  data: {
    auth: { accessToken: string; refreshToken: string } | null;
    profile: ProfileType | null;
  };
};

const initialState: UsersState = {
  data: {
    auth: null,
    profile: null
  }
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      const { accessToken, refreshToken } = action.payload;
      state.data.auth = { accessToken, refreshToken };
    },
    setProfile: (state, action) => {
      const {
        id,
        active,
        email,
        first_name: firstName,
        last_name: lastName,
        public_id: publicId,
        user_type: userType,
        username
      } = action.payload;
      state.data.profile = {
        id,
        active,
        email,
        firstName,
        lastName,
        publicId,
        userType,
        username
      };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        const { payload } = action;
        if (payload) {
          const { access_token: accessToken, refresh_token: refreshToken } = payload.data;
          state.data.auth = { accessToken, refreshToken };
        }
      })
      .addCase(login.rejected, () => {});
    builder
      .addCase(refreshToken.fulfilled, (state, action) => {
        const { payload } = action;
        const { access_token: accessToken } = payload.data;
        if (state.data.auth) {
          state.data.auth = { ...state.data.auth, accessToken };
        }
      })
      .addCase(refreshToken.rejected, () => {});
  }
});

export const authAction = authSlice.actions;
export default authSlice.reducer;
