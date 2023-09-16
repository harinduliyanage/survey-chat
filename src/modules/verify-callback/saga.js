/* eslint-disable import/no-cycle */
import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'modules/common/utils/request';
import API from './constants';
import { verifyCallbackActions } from './slice';

export function* verifyTokenGenerator({ payload }) {
  try {
    const response = yield call(request, API.POST_VERIFY_TOKEN, payload, false);
    yield put(verifyCallbackActions.verifyTokenSucceeded(response));
  } catch (error) {
    yield put(verifyCallbackActions.verifyTokenFailed(error?.message));
  }
}
export function* verifyTokenSaga() {
  yield takeLatest(verifyCallbackActions.verifyToken.type, verifyTokenGenerator);
}

export default verifyTokenSaga;
