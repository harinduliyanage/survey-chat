/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
/**
 * Initial states of Dashboard function are defined here
 */
export const initialState = {
  loading: false,
};
/**
 * Here mentioned all the reset password feature related actions
 */
export const resetPasswordSlice = createSlice({
  name: 'feature/reset-password',
  initialState,
  reducers: {
    resetPassword(state) {
      state.loading = true;
    },
    resetPasswordSucceeded(state) {
      state.loading = false;
    },
    resetPasswordFailed(state) {
      state.loading = false;
    },
  },
});
//
export const { actions: resetPasswordActions } = resetPasswordSlice;
