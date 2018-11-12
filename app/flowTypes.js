// @flow
import * as React from 'react';

// CentraApi data typs
export type LoginData = {
  email: string,
  password: string,
};


// Navigator data types
export type ScreenConfig = {
  screen: React.ComponentType<any>,
  id: string,
  reducer?: null | Function,
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
