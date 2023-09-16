/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { forgotPasswordActions } from 'modules/forgot-password/slice';
import { resetPasswordActions } from 'modules/reset-password/slice';
import { signInActions } from 'modules/sign-in/slice';
import { usersActions } from 'modules/users/slice';
import { verifyCallbackActions } from 'modules/verify-callback/slice';
import ERROR_TYPES from '../constants/error-types';

export const initialState = {
  isEnabled: false,
  message: '',
  type: ERROR_TYPES.SUCCESS,
};
/**
 * All actions related to notification feature are defined here
 */
export const notificationSlice = createSlice({
  name: 'feature/notification',
  initialState,
  reducers: {
    resetNotification(state) {
      state.isEnabled = false;
      state.message = '';
      state.type = ERROR_TYPES.SUCCESS;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInActions.signInFailed, (state, action) => ({
        ...state,
        type: ERROR_TYPES.WARNING,
        message: action?.payload?.message,
        isEnabled: true,
      }))
      .addCase(forgotPasswordActions.forgotPasswordSucceeded, (state, action) => ({
        ...state,
        type: ERROR_TYPES.SUCCESS,
        message: action?.payload,
        isEnabled: true,
      }))
      .addCase(verifyCallbackActions.verifyTokenFailed, (state, action) => ({
        ...state,
        type: ERROR_TYPES.ERROR,
        message: action?.payload?.message,
        isEnabled: true,
      }))
      .addCase(resetPasswordActions.resetPasswordSucceeded, (state, action) => ({
        ...state,
        type: ERROR_TYPES.SUCCESS,
        message: action?.payload,
        isEnabled: true,
      }))
      .addCase(resetPasswordActions.resetPasswordFailed, (state, action) => ({
        ...state,
        type: ERROR_TYPES.ERROR,
        message: action?.payload?.message,
        isEnabled: true,
      }))
      .addCase(usersActions.createGeneralUsersFailed, (state, action) => ({
        ...state,
        type: ERROR_TYPES.ERROR,
        message: action?.payload?.message,
        isEnabled: true,
      }))
      .addCase(usersActions.createGeneralUsersSucceeded, (state) => ({
        ...state,
        type: ERROR_TYPES.SUCCESS,
        message: 'User successfully created',
        isEnabled: true,
      }))
      .addCase(usersActions.createAdminUsersFailed, (state, action) => ({
        ...state,
        type: ERROR_TYPES.ERROR,
        message: action?.payload?.message,
        isEnabled: true,
      }))
      .addCase(usersActions.createAdminUsersSucceeded, (state) => ({
        ...state,
        type: ERROR_TYPES.SUCCESS,
        message: 'User successfully created',
        isEnabled: true,
      }))
      .addCase(usersActions.updateUserFailed, (state, action) => ({
        ...state,
        type: ERROR_TYPES.ERROR,
        message: action?.payload?.message,
        isEnabled: true,
      }))
      .addCase(usersActions.updateUserSucceeded, (state) => ({
        ...state,
        type: ERROR_TYPES.SUCCESS,
        message: 'User successfully updated',
        isEnabled: true,
      }))
      .addCase(usersActions.deleteUserFailed, (state, action) => ({
        ...state,
        type: ERROR_TYPES.ERROR,
        message: action?.payload?.message,
        isEnabled: true,
      }))
      .addCase(usersActions.deleteUserSucceeded, (state) => ({
        ...state,
        type: ERROR_TYPES.SUCCESS,
        message: 'User successfully deleted',
        isEnabled: true,
      }));
  },
});
//
export const { actions: notificationActions } = notificationSlice;
