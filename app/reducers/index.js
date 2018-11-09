/**
 * App rootReducer and persist-reducer.
 *
 * @flow
 */

import { AsyncStorage } from 'react-native';
import { createRootReducer, createPersistedReducer } from './createReducers';
import { screenConfigs } from '../screens';

// Redux root reducer.
export const rootReducer = createRootReducer(screenConfigs);

/* redux-persist config */
const persistConfig = {
  key: 'ocuMobile',
  storage: AsyncStorage,
};

export const persistReducer = createPersistedReducer(persistConfig, rootReducer);
