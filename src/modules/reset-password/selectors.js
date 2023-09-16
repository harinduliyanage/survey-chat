/* eslint-disable import/prefer-default-export */
import { createSelector } from '@reduxjs/toolkit';
import { initialState } from './slice';

const selectDomain = (state) => state['feature/reset-password'] || initialState;
/**
 * Getting loader state to reset password component
 */
export const selectLoader = createSelector(
  [selectDomain],
  (resetPasswordState) => resetPasswordState.loading
);
