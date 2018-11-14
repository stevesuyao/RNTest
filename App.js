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
import navigators from './app/navigators';
import type {
  ScreenConfig,
  SenesitveStorageConfig,
  PersistConfig,
  TopBarButton,
  NavigatorName,
  RNN2Config,
} from './app/flowTypes';
import { registerScreens } from './app/screens';
import createRootReducer from './app/reducers';
import configureStore from './app/store';
import wrapComponentWithRNN from './app/hoc/wrapComponentWithRNN';
import * as navigationLibName from './app/constants/navigationLibNames';

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
    this._navigationWrapper = null;
    this._navigator = null;
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

  _navigationWrapper: ?Function

  _navigator: any; // TODO: should be nvaigtor class type.

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

  /*
   * @brief Persist redux store
   *
   * @return a Promise
   */
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
   * @brief Set a navigation library to use
   * @TODO: currently support `react-native-navigation-v2`, may add other navigation lib in the future.
   * @TODO: native codes should be changed.
   *
   * @param name
   */
  setNavigator = (name: NavigatorName) => {
    if (!this.store) throw new Error('pls config redux store first');
    switch (name) {
      case navigationLibName.RNN2:
        this._navigator = new navigators[name](this.store, this.persistor);
        this._navigationWrapper = wrapComponentWithRNN;
        return;
      case navigationLibName.RNN1:
      case navigationLibName.RN:
      default:
        this._navigator = null;
        this._navigationWrapper = null;
    }
  };

  /*
   * @brief Register all screens components to navigator.
   */
  _registerScreens = () => {
    if (!this.screens) throw new Error('pls config least one screen.');
    if (!this.store) throw new Error('redux store has not been configured.');
    this._updateScreenNavigatorStyles(); // update navigatorStyle before we register screens.
    registerScreens(this.screens, this.store, Provider, this._navigationWrapper);
  }

  /*
   * @brief getImageSource from vector
   *
   * @return A promise
   */
  _setNativeIcons = (obj, icon) => new Promise((resolve) => {
    const { key, name, size } = obj;
    icon.getImageSource(name, size).then((value) => {
      this._nativeIcons[key] = value;
      resolve(true);
    });
  });

  /*
   * @brief set vector selections we want to use in the app.
   *
   * @param config
   * @parm iconSeletions Vector icon json file.
   */
  setIconImages = (config: Object, iconSeletions: Object) => {
    if (!config || !iconSeletions) throw new Error('please add config or an icoMoon json file first.');
    const iconObjs = [];
    _.forEach(config, (value, key) => iconObjs.push({
      key,
      name: value.name,
      size: value.size,
    }));
    if (iconObjs.length === 0) throw new Error('config file should contain least one key-value pair.');

    const icon = createIconSetFromIcoMoon(iconSeletions);

    this._loadIconImages = () => _.map(iconObjs, obj => this._setNativeIcons(obj, icon)); // promise array
  }

  /* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["i"] }] */
  _setIcon = (i:TopBarButton, nativeIcons: Object) => {
    const { imgName } = i;
    if (imgName && nativeIcons[imgName]) i.icon = nativeIcons[imgName];
  };

  /*
   * @brief update screen navigator style
   * @NOTE should invoke it after loading vector icon images.
   */
  _setTopbarBtnImageSrc = (config: RNN2Config) => {
    const { navigatorStyle } = config;
    if (!navigatorStyle || !navigatorStyle.topBar) return;
    const { leftButtons, rightButtons } = navigatorStyle.topBar;
    if (leftButtons && leftButtons.length > 0) _.forEach(leftButtons, i => this._setIcon(i, this._nativeIcons));
    if (rightButtons && leftButtons.length > 0) _.forEach(rightButtons, i => this._setIcon(i, this._nativeIcons));
  };

  _updateScreenNavigatorStyles = () => {
    if (!this._nativeIcons || !this._navigator) return;
    if (this._navigator.name === navigationLibName.RNN2) {
      _.forEach(this.screens, (i) => {
        if (i.navigatorConfig) this._setTopbarBtnImageSrc(i.navigatorConfig);
      });
    }
    // TODO: add supports for other navigation libraries.
  }

  _startApp = () => {
    if (!this._navigator || !this._navigator.start) throw new Error('please set a valid navigator first.');
    this._navigator.setPersistor(this.persistor);
    this._navigator.start();
  }

  bootStrap = async () => {
    await Promise.all([this._setPersistStore(), ...this._loadIconImages()]);
    this._registerScreens();
    this._startApp();
  }
}
