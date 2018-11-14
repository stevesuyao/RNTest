/**
 * App configs
 *
 * @flow
 *
 */

/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import {
  PERSIST_KEY, SENSITIVE_PERSISIT_KEY, KEY_CHAIN_SERVICE, SHARED_PREFS_NAME,
} from 'react-native-dotenv';

export const centraConfig = {
  HOST_ADDRESS: 'https://centra-dev.piaggiofastforward.com',
  SERVICES_ENDPOINT: {
    USER: '/users',
    AUTH: '/auth',
    TRIBE: '/tribes',
    REGISTRATION: '/registrations',
    INVITE: '/invites',
    GITA: '/gitas',
    TEMP: '/temp',
  },
  DEFAULT_TIME_OUT: 15000, // ms
  REQUEST_TIME_OUT: 12000, // ms
  TIME_OUT_ERROR: 'The server is taking too long to response',
};

export const bleConfig = {
  SERVICE_UUID: '9999', // Gita service uuid
};


export const persistConfig = {
  key: PERSIST_KEY,
  blacklist: ['user'],
};

export const sensitivePersistConfig = {
  key: SENSITIVE_PERSISIT_KEY,
  whitelist: ['user'],
};

export const senesitveStorageConfig = {
  keychainService: KEY_CHAIN_SERVICE,
  sharedPreferencesName: SHARED_PREFS_NAME,
};

export const iconImagesConfig = {
  menu: { key: 'menu', name: 'hamburger', size: 15 },
  profile: { key: 'profile', name: 'userProfile', size: 30 },
  search: { key: 'search', name: 'search', size: 30 },
  edit: { key: 'edit', name: 'editingPencil', size: 30 },
};
