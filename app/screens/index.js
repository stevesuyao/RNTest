/**
 * Screen configs and register method.
 *
 * @flow
 */

import { connect } from 'react-redux';
import type { Store } from 'redux';
import type { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import _ from 'lodash';
import loginScreenConfig from './signIn';
import initScreenConfig from './initializing';
import homeScreenConfig from './home';
import sideMenuConfig from './sideMenu';
import joystickCOnfig from './joystick';
import signupScreenConifig from './signUp';
import type { ScreenConfig } from '../flowTypes';

// Array of screen configs
export const screenConfigs = [
  initScreenConfig,
  loginScreenConfig,
  homeScreenConfig,
  sideMenuConfig,
  joystickCOnfig,
  signupScreenConifig,
];


// Register a single screen component
export const registerComponent = (i: ScreenConfig, store: Store, provider: Provider, hoc: ?Function) => {
  const {
    screen,
    navigatorConfig,
    mapStateToProps,
    mapDispatchToProps,
  } = i;
  if (!screen) return;

  const component = (navigatorConfig && hoc) ? connect(mapStateToProps, mapDispatchToProps)(hoc(screen, navigatorConfig)) : connect(mapStateToProps, mapDispatchToProps)(screen);

  if (mapStateToProps || mapDispatchToProps) {
    console.log(i.id);
    Navigation.registerComponentWithRedux(i.id, () => component, provider, store);
  } else {
    Navigation.registerComponent(i.id, () => component);
  }
};

// Register all screens
export const registerScreens = (configs: Array<ScreenConfig>, store: Store, provider: Provider, hoc:?Function = null) => {
  _.forEach(configs, i => registerComponent(i, store, provider, hoc));
};
