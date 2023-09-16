/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-cycle */
import axios from 'axios';
import store from 'store/index';
import { ENVIRONMENT } from 'config';
import API from '../auth/constants';
import { authActions } from '../auth/slice';

const getTokens = () => store.getState()['feature/base-auth']?.tokens;
//
const axiosConfig = axios.create({
  baseURL: ENVIRONMENT.BACKEND_API,
});
//
let newAccessToken = null;
/**
 * Here is the axios request interceptor. Here we add the request header into the
 */
axiosConfig.interceptors.request.use((requestConfig) => {
  const config = requestConfig;
  const { accessToken } = getTokens();
  if (accessToken && 'Authorization' in config.headers) {
    config.headers.Authorization = `Bearer ${newAccessToken ?? accessToken}`;
  }
  return config;
});
//
const getRefreshToken = () => {
  const { refreshToken } = getTokens();
  //
  return axiosConfig.post(API.POST_REFRESH_TOKENS.path, {
    refreshToken,
  });
};
/**
 * Here is the axios response interceptor. Based on the response status fetch the new access token based on the refresh token
 */
axiosConfig.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { refreshToken } = getTokens();
    const originalRequest = error.config;
    if (
      (error?.response?.status === 403 || error?.response?.status === 401) &&
      refreshToken &&
      !originalRequest._retry
    ) {
      try {
        originalRequest._retry = true;
        const tokenData = await getRefreshToken();
        store.dispatch(authActions.refreshTokenSucceeded(tokenData.data));
        newAccessToken = tokenData.data.accessToken;
        originalRequest._queue = true;
        originalRequest.headers.Authorization = `Bearer ${tokenData.data.accessToken}`;

        return axiosConfig(originalRequest);
      } catch (e) {
        store.dispatch(authActions.refreshTokenFailed(e.message));
        return Promise.reject(e);
      }
    } else {
      return Promise.reject(error);
    }
  }
);
//
export default axiosConfig;
