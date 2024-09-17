import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosRequest } from '~/core/api';
import { FormValues as LoginFormValues } from '~/main/screens/Auth/Login/common/form';
import { typesAction, typesApi } from './const';
import { FormValues as ChangePasswordFormValues } from '~/main/screens/Profile/ChangePassword/common/form';
import { FormValues as RequestPasswordFormValues } from '~/main/screens/Auth/RequestPassword/common/form';
import { ResetPasswordFormValues } from './types';

export const login = createAsyncThunk(typesAction.LOGIN_ACTION, async (payload: LoginFormValues) => {
  const { email, password } = payload;

  const loginForm = new FormData();
  loginForm.append('email', email);
  loginForm.append('password', password);

  const response = await axiosRequest
    .post(typesApi.LOGIN_API, loginForm, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    .catch((error) => error.response);
  return response;
});

export const refreshToken = createAsyncThunk(
  typesAction.REFRESH_TOKEN_ACTION,
  async (payload: { refreshToken: string }) => {
    const { refreshToken } = payload;
    const response = await axiosRequest.get(typesApi.REFRESH_API, {
      headers: { Authorization: `Bearer ${refreshToken}` }
    });
    return response;
  }
);

export const changePassword = createAsyncThunk(
  typesAction.CHANGE_PASSWORD_ACTION,
  async (payload: ChangePasswordFormValues) => {
    const { newPassword, previousPassword } = payload;

    const changePasswordForm = new FormData();
    changePasswordForm.append('new_pass', newPassword);
    changePasswordForm.append('current_pass', previousPassword);

    const response = await axiosRequest.post(typesApi.CHANGE_PASSWORD_API, changePasswordForm, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response;
  }
);

export const requestNewPassword = createAsyncThunk(
  typesAction.REQUEST_NEW_PASSWORD_ACTION,
  async (payload: RequestPasswordFormValues) => {
    const { email } = payload;

    const requestNewPasswordForm = new FormData();
    requestNewPasswordForm.append('email', email);

    const response = await axiosRequest.post(typesApi.REQUEST_NEW_PASSWORD_API, requestNewPasswordForm, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response;
  }
);

export const resetPassword = createAsyncThunk(
  typesAction.RESET_PASSWORD_ACTION,
  async (payload: ResetPasswordFormValues) => {
    const { email, password, resetPasswordToken } = payload;

    const resetPasswordForm = new FormData();
    resetPasswordForm.append('email', email);
    resetPasswordForm.append('password', password);
    resetPasswordForm.append('reset_password_token', resetPasswordToken);

    const response = await axiosRequest.post(typesApi.RESET_PASSWORD_API, resetPasswordForm, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response;
  }
);

export const authActionApi = {
  login,
  refreshToken,
  changePassword,
  requestNewPassword,
  resetPassword
};

export default authActionApi;
