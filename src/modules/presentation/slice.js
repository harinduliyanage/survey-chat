/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
/**
 * Initial states of Dashboard function are defined here
 */
export const initialState = {
  loading: false,
  isInvalidHashId: false,
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
      state.isInvalidHashId = false;
    },
    getPresentationFailed(state) {
      state.loading = false;
      state.isInvalidHashId = true
    },
  },
});
//
export const { actions: presentationActions } = presentationSlice;
