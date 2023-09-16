/* eslint-disable import/no-cycle */
import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'modules/common/utils/request';
import { forgotPasswordActions } from './slice';
import API from './constants';
/**
 * New password store generator function for Power BI embedding
 * @param {*} param0
 */
export function* forgotPasswordGenerator({ payload }) {
  try {
    yield call(request, API.POST_FORGOT_PASSWORD, payload, false);
    yield put(
      forgotPasswordActions.forgotPasswordSucceeded(
        'Password reset link has been sent to your email address'
      )
    );
  } catch (error) {
    yield put(forgotPasswordActions.forgotPasswordFailed(error?.message));
  }
}
//
export function* forgotPasswordSaga() {
  yield takeLatest(forgotPasswordActions.forgotPassword.type, forgotPasswordGenerator);
}
//
export default forgotPasswordSaga;
