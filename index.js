/*
 * Entry point of the react native app.
 * @format
 *
 * @flow
 */

import { AsyncStorage } from 'react-native';
import createSagaMiddleware from 'redux-saga';
import { screenConfigs } from './app/screens';
import App from './App';
import rootSaga from './app/sagas';
import defaultReducer from './app/reducers/defaultReducer';
import {
  persistConfig, sensitivePersistConfig, senesitveStorageConfig, iconImagesConfig,
} from './app/config';
import sensitiveReducer from './app/reducers/sensitiveReducer';
import icoMoonSeletions from './app/assets/vectors/selection.json';

const app = new App(screenConfigs);

// set app localStorage
app.setLocalStorage(AsyncStorage);

// set app sensitive info storage
app.setSensitiveStorage(senesitveStorageConfig);

// create sensitive reducer
app.setSensitiveReducer(sensitiveReducer, sensitivePersistConfig);

// create root reducer.
app.setRootReducer(defaultReducer, persistConfig);

// create redux middleware.
const sagaMiddleware = createSagaMiddleware();

// configure redux store and apply middlewares.
app.setStore(sagaMiddleware);

// run saga middleware after apply it to store.
sagaMiddleware.run(rootSaga);

// set native button images.
app.setIconImages(iconImagesConfig, icoMoonSeletions);

// start app.
app.bootStrap();
