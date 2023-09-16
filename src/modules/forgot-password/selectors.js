/* eslint-disable import/prefer-default-export */
import { createSelector } from '@reduxjs/toolkit';
import { initialState } from './slice';

const selectDomain = (state) => state['feature/forgot-password'] || initialState;
/**
 * Getting loader state to forgot password component
 */
export const selectLoader = createSelector(
  [selectDomain],
  (forgotPasswordState) => forgotPasswordState.loading
);