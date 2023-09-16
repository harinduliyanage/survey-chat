/* eslint-disable import/prefer-default-export */
import { createSelector } from '@reduxjs/toolkit';
import { initialState } from './slice';

const selectDomain = (state) => state['feature/presentation'] || initialState;
/**
 * Getting loader state to dashboard component
 */
export const selectLoader = createSelector(
  [selectDomain],
  (presentationState) => presentationState.loading
);
/**
 * Getting the business info state into the component
 */
export const selectIsInvalidHashId = createSelector(
  [selectDomain],
  (presentationState) => presentationState?.isInvalidHashId
);
