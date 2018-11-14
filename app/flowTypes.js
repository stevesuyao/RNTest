// @flow
import * as React from 'react';
import type { NavigatorStyle } from 'react-native-navigation';

// CentraApi data typs
export type LoginData = {
  email: string,
  password: string,
};


// Navigator types
export type NavigatorName = 'RNN1' | 'RNN2'| 'RN' | null; // TODO: add more navigation libraries name here.

export type RNN2Config = {
  navigatorStyle: NavigatorStyle,
  navigatorEvents?: {
    componentDidApper?: ?Function,
    componentDidDisappear?: ?Function,
    navigationButtonPressed?: ?Function,
    // TODO: add more evnets type here.
  },
};

export type Navigator = {
  name: NavigatorName,
  apis: {
    goHome: Function,
    goAuth: Function,
  }
}

export type ScreenConfig = {
  screen: React.ComponentType<any>,
  id: string,
  reducer: ?Function,
  navigatorConfig: ?RNN2Config,
  mapStateToProps: ?Function,
  mapDispatchToProps: ?Function,
}


// Meesage data type
export type Message = {
  content: string,
  type: string,
};

export type MiddlewareObject = {
  middleware: any,
  run: Function,
};

export type ActionType = {
  REQUEST: string,
  SUCCESS: string,
  FAILURE: string,
  CANCELLED: string,
  KEY: string,
  hasPayload: boolean,
};

export type SenesitveStorageConfig = {
  keychainService: string,
  sharedPreferencesName: string,
};

export type PersistConfig = {
  key: string,
  blacklist?: Array<string>,
  whitelist?: Array<string>,
} | null;


export type IconImageSource = {
  uri: string,
  scale: number,
};


export type TopBarButton = {
  id: string,
  color?: string,
  icon?: IconImageSource,
  imgName?: string,
  enabled: boolean,
  text?: string,
  size?: number,
};
