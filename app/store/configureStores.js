/**
 * Methods of configuring redux store and persist store
 *
 * @flow
 */

import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import type { Reducer } from 'redux';
import type { Persistor } from 'redux-persist/es/types';
import rootSaga from '../sagas';

export const configureStore = (reducer: Reducer) => {
  let store;
  const sagaMiddleware = createSagaMiddleware();
  if (__DEV__) { /* eslint no-undef: 0 */
    const logger = createLogger();
    store = createStore(reducer, applyMiddleware(sagaMiddleware, logger));
  } else store = createStore(reducer, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(rootSaga);
  return store;
};

export const configurePersistStore = (reducer: Reducer):Persistor => persistStore(configureStore(reducer));
