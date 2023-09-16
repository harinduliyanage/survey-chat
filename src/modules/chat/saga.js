/* eslint-disable import/no-cycle */
import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'modules/common/utils/request';
import { chatActions } from './slice';
import API from './constants';
/**
 * Generator function for create survey session
 * @param {Object} payload
 */
export function* createSurveySessionGenerator({ payload }) {
    try {
        const response = yield call(request, API.ADD_OPEX, payload);
        yield put(chatActions.createSurveySessionSucceeded(response));
    } catch (error) {
        yield put(chatActions.createSurveySessionFailed(error?.message));
    }
}
/**
 * Redux saga that triggers above generated functions
 */
export function* chatSaga() {
    yield takeLatest(chatActions.createSurveySession.type, createSurveySessionGenerator);
}
//
export default chatSaga;