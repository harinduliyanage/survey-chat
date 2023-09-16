/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
/**
 * Initial states of Dashboard function are defined here
 */
export const initialState = {
  loading: false,
  surveyInfo: {}
};
/**
 * All actions related to dashboard feature are defined here
 */
export const businessInfoSlice= createSlice({
  name: 'feature/business-info',
  initialState,
  reducers: {
    createSurvey(state) {
      state.loading = true;
    },
    createSurveySucceeded(state, action) {
      state.loading = false;
      state.surveyInfo = action?.payload;
    },
    createSurveyFailed(state) {
      state.loading = false;
    },
  },
});
//
export const { actions: businessInfoActions } = businessInfoSlice;
