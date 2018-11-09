/**
 * App class
 *
 * @flow
 */

import type { Persistor } from 'redux-persist/es/types';
import type { Provider } from 'react-redux';
import type { Store } from 'redux';
import { startInitalScreen } from './app/services/navigation';
import type { ScreenConfig } from './app/flowTypes';
import { registerScreens } from './app/screens';


export default class App {
  constructor(screens: Array<ScreenConfig>, store: Store, persistor: Persistor, provider: Provider) {
    this.screens = screens;
    this.store = store;
    this.persistor = persistor;
    this.provider = provider;
  }

  screens: Array<ScreenConfig>

  store: Store

  persistor: Persistor

  provider: Provider

  /*
   * @brief Register all screens components to navigator.
   */
  _registerScreens() {
    if (!this.store) throw new Error('redux store has not been configured.');
    registerScreens(this.screens, this.store, this.provider);
  }


  startApp() {
    this._registerScreens();
    // Start app only if all icons are loaded.
    startInitalScreen();
  }
}
