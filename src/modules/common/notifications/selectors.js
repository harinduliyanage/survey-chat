/* eslint-disable import/prefer-default-export */
import { createSelector } from '@reduxjs/toolkit';
import { initialState } from './slice';

const selectDomain = (state) => state['feature/notification'] || initialState;
/**
 * Select notification state into the all the component
 */
export const selectNotification = createSelector(
  [selectDomain],
  (notificationState) => notificationState
);
