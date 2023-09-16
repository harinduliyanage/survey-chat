/* eslint-disable import/no-cycle */
import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'modules/common/utils/request';
import { resetPasswordActions } from './slice';
import API from './constants';
/**
 * Reset password generator function for update user password
 * @param {*} param0
 */
export function* resetPasswordGenerator({ payload }) {
  try {
    const response = yield call(request, API.POST_REST_PASSWORD, payload, false);
    yield put(resetPasswordActions.resetPasswordSucceeded(response));
  } catch (error) {
    yield put(resetPasswordActions.resetPasswordFailed(error?.message));
  }
}
//
export function* resetPasswordSaga() {
  yield takeLatest(resetPasswordActions.resetPassword.type, resetPasswordGenerator);
}
//
export default resetPasswordSaga;
