/* eslint-disable import/prefer-default-export */
import { createSelector } from '@reduxjs/toolkit';
import { initialState } from './slice';

const selectDomain = (state) => state['feature/verify-callback'] || initialState;
//
export const selectLoader = createSelector(
  [selectDomain],
  (verifyCallbackState) => verifyCallbackState.loading
);
