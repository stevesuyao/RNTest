/**
 * Methods of configuring redux store and persist store
 *
 * @flow
 */

import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import type { Reducer } from 'redux';

const configureStore = (reducer: Reducer, ...middleware:any) => {
  let store;
  if (__DEV__) { /* eslint no-undef: 0 */
    const logger = createLogger();
    store = createStore(reducer, applyMiddleware(...middleware, logger));
  } else store = createStore(reducer, applyMiddleware(...middleware));
  return store;
};

export default configureStore;
  // const sagaMiddleware = createSagaMiddleware();
  //   sagaMiddleware.run(rootSaga);
