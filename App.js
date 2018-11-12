/**
 * App class
 *
 * @flow
 */

import _ from 'lodash';
import type { Persistor } from 'redux-persist/es/types';
import { combineReducers } from 'redux';
import { Provider } from 'react-redux';
import type { Store as ReduxStore, Reducer as ReduxReducer } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import createSenesitveStorage from 'redux-persist-sensitive-storage';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import * as NavigationApis from './app/services/navigation';
import type { ScreenConfig, SenesitveStorageConfig, PersistConfig } from './app/flowTypes';
import { registerScreens } from './app/screens';
import createRootReducer from './app/reducers';
import configureStore from './app/store';


export default class App {
  constructor(screenConfigs: Array<ScreenConfig>) {
    this.screens = screenConfigs;
    this.storage = null;
    this.rootReducer = null;
    this.sensitiveReducer = null;
    this.store = null;
    this.sensitiveStorage = null;
    this.persistor = null;
    this._nativeIcons = {};
    this._loadIconImages = () => null;
  }

  screens: Array<ScreenConfig>

  storage: any

  store: ReduxStore

  persistor: null | Persistor

  sensitiveStorage: any

  rootReducer: ReduxReducer

  sensitiveReducer: ReduxReducer

  _nativeIcons: Object

  _loadIconImages: Function

  setLocalStorage = (storage: any) => {
    this.storage = storage;
  };

  setSensitiveStorage = (senesitveStorageConfig:SenesitveStorageConfig) => {
    if (!senesitveStorageConfig) throw new Error('sensitive storage config not found.');
    this.sensitiveStorage = createSenesitveStorage(senesitveStorageConfig);
  }

  _createPersistConfig = (persistConfig: PersistConfig) => ({
    ...persistConfig,
    storage: this.storage,
  });

 _createSensitivePersistConifg = (sensitivePersistConfig: PersistConfig) => ({
   ...sensitivePersistConfig,
   storage: this.sensitiveStorage,
 })

  setSensitiveReducer = (sensitiveReducer: ReduxReducer, sensitivePersistConfig: PersistConfig) => {
    if (!sensitiveReducer) throw new Error('sensitive reducer should not be null.');
    if (!this.sensitiveStorage) throw new Error('sensitive storage have not been created.');
    this.sensitiveReducer = persistReducer(this._createSensitivePersistConifg(sensitivePersistConfig), sensitiveReducer);
  }

  setRootReducer = (defaultReducer: ReduxReducer, persistConfig: PersistConfig = null) => {
    const rootReducer = createRootReducer(this.screens, defaultReducer);
    if (this.storage && persistConfig) this.rootReducer = persistReducer(this._createPersistConfig(persistConfig), rootReducer);
    else this.rootReducer = rootReducer;
  }

  setStore = (...middleware:any) => {
    if (!this.rootReducer) throw new Error('root reducer has not been set.');
    if (this.sensitiveReducer) {
      const reducer = combineReducers({
        main: this.rootReducer,
        sensitive: this.sensitiveReducer,
      });
      this.store = configureStore(reducer, ...middleware);
    } else this.store = configureStore(this.rootReducer, ...middleware);
  }

  _setPersistStore = () => {
    if (!this.storage) return null;
    return new Promise((resolve) => {
      this.persistor = persistStore(this.store, undefined, () => {
        console.log('persiste store resolved.');
        resolve(true);
      });
    });
  }

  /*
   * @brief Register all screens components to navigator.
   */
  _registerScreens = () => {
    if (!this.screens) throw new Error('pls config least one screen.');
    if (!this.store) throw new Error('redux store has not been configured.');
    registerScreens(this.screens, this.store, Provider);
  }

  _setNativeIcons = (obj, icon, size) => new Promise((resolve) => {
    icon.getImageSource(obj.value, size).then((value) => {
      this._nativeIcons[obj.key] = value;
      resolve(true);
    });
  });
  // this._nativeIcons[obj.key] = icon.getImageSource(obj.value, size);

  setIconImages = (config: Object, icoMoonSeletions: Object) => {
    if (!config || !icoMoonSeletions) throw new Error('please add config or an icoMoon json file first.');
    const iconObjs = [];
    _.forEach(config, (value, key) => iconObjs.push({ key, value }));
    if (iconObjs.length === 0) throw new Error('config file should contain least one key-value pair.');

    const icon = createIconSetFromIcoMoon(icoMoonSeletions);

    this._loadIconImages = () => _.map(iconObjs, obj => this._setNativeIcons(obj, icon, 30)); // promise array
  }

  startApp = () => {
    const state = this.store.getState();
    if (state.sensitive.user) NavigationApis.goHome();
    // if (this.persistor) startInitalScreen({ localPurge: this.persistor.purge });
    else NavigationApis.goAuth();
  }

  bootStrap = async () => {
    this._registerScreens();

    await Promise.all([this._setPersistStore(), ...this._loadIconImages()]);

    this.startApp();
  }
}
