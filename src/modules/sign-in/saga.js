/* eslint-disable import/no-cycle */
import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'modules/common/utils/request';
import { signInActions } from './slice';
import API from './constants';

/**
 * Sign In generator function for user authentication
 * @param {*} param0
 */
export function* signInGenerator({ payload }) {
  try {
    const response = yield call(request, API.POST_SIGN_IN, payload, false);
    yield put(signInActions.signInSucceeded(response));
  } catch (error) {
    yield put(signInActions.signInFailed(error.message));
  }
}
//
export function* signInSaga() {
  yield takeLatest(signInActions.signIn.type, signInGenerator);
}
//
export default signInSaga;
