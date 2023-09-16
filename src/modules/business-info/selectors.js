/* eslint-disable import/prefer-default-export */
import { createSelector } from '@reduxjs/toolkit';
import { initialState } from './slice';

const selectDomain = (state) => state['feature/dashboard'] || initialState;
/**
 * Getting loader state to dashboard component
 */
export const selectLoader = createSelector(
  [selectDomain],
  (dashboardState) => dashboardState.loading
);
