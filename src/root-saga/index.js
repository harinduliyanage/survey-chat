import { chatSaga } from 'modules/chat/saga';
import { businessInfoSaga } from 'modules/business-info/saga';
import { all, fork } from 'redux-saga/effects';

/**
 * Register all the saga functions into the root saga
 */
export default function* rootSaga() {
  yield all([
    fork(chatSaga),
    fork(businessInfoSaga),
  ]);
}
