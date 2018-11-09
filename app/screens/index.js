/**
 * Screen configs and register method.
 *
 * @flow
 */
import type { Store } from 'redux';
import type { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import _ from 'lodash';
import loginScreenConfig from './signIn';
import initScreenConfig from './initializing';
import homeScreenConfig from './home';
import sideMenuConfig from './sideMenu';
import joystickCOnfig from './joystick';
import type { ScreenConfig } from '../flowTypes';

// Array of screen configs
export const screenConfigs = [
  initScreenConfig,
  loginScreenConfig,
  homeScreenConfig,
  sideMenuConfig,
  joystickCOnfig,
];


// Register a screen component
export const registerComponent = (i: ScreenConfig, store: Store, provider: Provider) => {
  if (i.reducer) {
    Navigation.registerComponentWithRedux(i.id, () => i.screen, provider, store);
  } else {
    Navigation.registerComponent(i.id, () => i.screen);
  }
};

// Register all screens
export const registerScreens = (configs: Array<ScreenConfig>, store: Store, provider: Provider) => {
  _.forEach(configs, i => registerComponent(i, store, provider));
};
