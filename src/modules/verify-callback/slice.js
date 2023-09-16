/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  loading: false,
};

export const verifyCallbackSlice = createSlice({
  name: 'feature/verify-callback',
  initialState,
  reducers: {
    verifyToken(state) {
      state.loading = true;
    },
    verifyTokenSucceeded(state) {
      state.loading = false;
    },
    verifyTokenFailed(state) {
      state.loading = false;
    },
  },
});

export const { actions: verifyCallbackActions } = verifyCallbackSlice;
