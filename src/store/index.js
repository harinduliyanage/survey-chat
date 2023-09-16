/* eslint-disable import/no-cycle */
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from 'root-saga';
import customMiddleware from 'modules/common/middleware/custom-middleware';
import { notificationSlice } from 'modules/common/notifications/slice';
import { businessInfoSlice } from 'modules/business-info/slice';
import { chatSlice } from 'modules/chat/slice';

export const sagaMiddleware = createSagaMiddleware();
/**
 * Combine all the persist and non persist reducers
 */
const reducers = combineReducers({
  'feature/notification': notificationSlice.reducer,
  'feature/business-info': businessInfoSlice.reducer,
  'feature/chat': chatSlice.reducer
});
/**
 * Register all the slices into the main store with encryption
 */
const store = configureStore({
  reducer: reducers,
  middleware: () => [
    sagaMiddleware,
    customMiddleware,
  ],
});
sagaMiddleware.run(rootSaga);
//
export default store;
