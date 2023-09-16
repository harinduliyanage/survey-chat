/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
/**
 * Initial states of Dashboard function are defined here
 */
export const initialState = {
  loading: false,
  presentation: false
};
/**
 * All actions related to dashboard feature are defined here
 */
export const presentationSlice= createSlice({
  name: 'feature/business-info',
  initialState,
  reducers: {
    getPresentation(state) {
      state.loading = true;
    },
    getPresentationSucceeded(state) {
      state.loading = false;
      state.presentation = true;
    },
    getPresentationFailed(state) {
      state.loading = false;
      state.presentation = false
    },
  },
});
//
export const { actions: presentationActions } = presentationSlice;
