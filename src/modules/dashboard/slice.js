/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
/**
 * Initial states of Dashboard function are defined here
 */
export const initialState = {
  loading: false,
  deviceList: {},
  selectedDevicesList: {},
  readingGroupedByDevice: {},
  filterList: {
    results: [],
  },
};
/**
 * All actions related to dashboard feature are defined here
 */
export const dashboardSlice = createSlice({
  name: 'feature/dashboard',
  initialState,
  reducers: {},
});
//
export const { actions: dashboardActions } = dashboardSlice;
