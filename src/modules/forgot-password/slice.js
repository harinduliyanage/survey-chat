/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
/**
 * Initial states of Dashboard function are defined here
 */
export const initialState = {
  loading: false,
};
/**
 * All actions related to forgot password feature are defined here
 */
export const forgotPasswordSlice = createSlice({
  name: 'feature/forgot-password',
  initialState,
  reducers: {
    forgotPassword(state) {
      state.loading = true;
    },
    forgotPasswordSucceeded(state) {
      state.loading = false;
    },
    forgotPasswordFailed(state) {
      state.loading = false;
    },
  },
});
//
export const { actions: forgotPasswordActions } = forgotPasswordSlice;
