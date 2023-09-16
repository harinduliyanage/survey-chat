/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
/**
 * Define the the sign in feature initial state
 */
export const initialState = {
  loading: false,
};
/**
 * Here mentioned all the sign in feature related actions
 */
export const signInSlice = createSlice({
  name: 'feature/sign-in',
  initialState,
  reducers: {
    signIn(state) {
      state.loading = true;
    },
    signInSucceeded(state) {
      state.loading = false;
    },
    signInFailed(state) {
      state.loading = false;
    },
  },
});
//
export const { actions: signInActions } = signInSlice;
