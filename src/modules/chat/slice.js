/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
/**
 * Initial states of Dashboard function are defined here
 */
export const initialState = {
  loading: false,
};
/**
 * All actions related to dashboard feature are defined here
 */
export const chatSlice = createSlice({
  name: 'feature/chat',
  initialState,
  reducers: {
    createSurveySession: (state) => ({
      ...state,
      loading: true,
    }),
    createSurveySessionSucceeded: (state) => ({
      ...state,
      loading: true,
    }),
    createSurveySessionFailed: (state) => ({
      ...state,
      loading: true,
    }),
  },
});
//
export const { actions: chatActions } = chatSlice;
