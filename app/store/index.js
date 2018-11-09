/**
 * App reudx store and persist store.
 *
 * @flow
 */

import { rootReducer, persistReducer } from '../reducers';
import { configureStore, configurePersistStore } from './configureStores';

export const store = configureStore(rootReducer);

export const persistor = configurePersistStore(persistReducer);
