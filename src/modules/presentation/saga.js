/* eslint-disable import/no-cycle */
import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'modules/common/utils/request';
import { presentationActions } from './slice';
import API from './constants';

/**
 * get presentation generator function to check presentation exists or not
 * @param {*} param0
 */
export function* presentationGenerator({ payload }) {
  try {
    const response = yield call(request, API.GET_PRESENTATION, payload);
    yield put(presentationActions.getPresentationSucceeded(response));
  } catch (error) {
    yield put(presentationActions.getPresentationFailed(error?.message));
  }
}
export function* presentationSaga() {
  yield takeLatest(presentationActions.getPresentation.type, presentationGenerator);
}
//
export default presentationSaga;
