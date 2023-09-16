/* eslint-disable import/no-cycle */
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from 'root-saga';
import customMiddleware from 'modules/common/middleware/custom-middleware';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistStore,
} from 'redux-persist';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import storage from 'redux-persist/lib/storage';
import { ENVIRONMENT } from 'config';
import logger from 'modules/common/utils/logger';
import { notificationSlice } from 'modules/common/notifications/slice';
import { dashboardSlice } from 'modules/dashboard/slice';

export const sagaMiddleware = createSagaMiddleware();
/**
 * Setup encryption using specific key
 */
const encryption = encryptTransform({
  secretKey: ENVIRONMENT.PERSIST_ENCRYPTED_SECRET_KEY,
  onError(error) {
    logger.error(error);
  },
});
/**
 * White listed slices which needs to be persist with encryption
 */
const persistConfig = {
  version: ENVIRONMENT.PERSIST_VERSION,
  key: ENVIRONMENT.PERSIST_KEY,
  storage,
  stateReconciler: hardSet,
  transforms: [encryption],
  whitelist: ['feature/base-auth', 'feature/static-data'],
  writeFailHandler(error) {
    logger.error(error);
  },
};
/**
 * Combine all the persist and non persist reducers
 */
const reducers = combineReducers({
  'feature/notification': notificationSlice.reducer,
  'feature/dashboard': dashboardSlice.reducer,
});
/**
 * Define what are the slice which needs to be persist
 */
const persistedReducer = persistReducer(persistConfig, reducers);
/**
 * Register all the slices into the main store with encryption
 */
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    sagaMiddleware,
    customMiddleware,
  ],
});
sagaMiddleware.run(rootSaga);
persistStore(store);
//
export default store;
