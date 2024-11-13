import axios, { AxiosRequestConfig, Method } from 'axios';
import { appApiUrl, isDev } from '../config';
import { getCookie } from '../storage/cookies';
import { AccountingSession } from '~/const/storage';

export const axiosRequest = axios.create({
  baseURL: appApiUrl,
  headers: { 'Content-Type': 'application/json' }
});

axiosRequest.interceptors.request.use(async (config) => {
  // Log for dev
  if (isDev) {
    console.log('REQUEST: ', config.url);
  }

  const authorization = config.headers.Authorization;
  if (!authorization) {
    const authCookie = getCookie(AccountingSession) || '';
    if (authCookie) {
      const authSession = JSON.parse(decodeURIComponent(authCookie));

      if (authSession) {
        const { accessToken } = authSession;
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    return config;
  }

  return config;
});

export async function apiCaller(api: string, method: Method = 'GET', options: AxiosRequestConfig = {}) {
  let url = api;
  if (!/(http(s?)):\/\//i.test(api)) {
    url = `${appApiUrl}${api}`;
  }

  // console.log('REQUEST: ', url);

  return axios({ url, method, ...options })
    .then((response) => response)
    .catch((error) => {
      console.error(`${error}`);
      return error.response;
    });
}
