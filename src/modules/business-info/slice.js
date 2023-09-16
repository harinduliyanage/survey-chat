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
export const businessInfoSlice= createSlice({
  name: 'feature/business-info',
  initialState,
  reducers: {},
});
//
export const { actions: businessInfoActions } = businessInfoSlice;
