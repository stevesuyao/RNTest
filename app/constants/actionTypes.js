/*
 * Actions types.
 *
 * @flow
 */

import type { ActionType } from '../flowTypes';

// Default app action types
const APP_RESET = 'APP_RESET';
const CHECK_NETCONNECTION = 'CHECK_NETCONNECTION';
const CHECK_BLESTATUS = 'CHECK_BLESTATUS';
const APP_STATE_CHANGE = 'APP_STATE_CHANGE';

export const defaultAppActionTypes = {
  APP_RESET,
  CHECK_NETCONNECTION,
  CHECK_BLESTATUS,
  APP_STATE_CHANGE,
};

// Suffix
const REQUEST_TYPE = '_REQUEST';
const SUCCESS_TYPE = '_REQUEST_SUCCESS';
const FAILURE_TYPE = '_REQUEST_FAIL';
const CANCELLED_TYPE = '_REQUEST_CANCELLED';

export const makeActionTypes = (prefix: string, hasPayload: boolean = true):ActionType => ({
  REQUEST: prefix + REQUEST_TYPE,
  SUCCESS: prefix + SUCCESS_TYPE,
  FAILURE: prefix + FAILURE_TYPE,
  CANCELLED: prefix + CANCELLED_TYPE,
  KEY: prefix,
  hasPayload,
});

// Message action types
export const CLEAR_MESSAGE = 'CLEAR_MESSAGE';
export const SEND_MESSAGE = 'SEND_MESSAGE';

// Common action prefix
const LOGIN = 'LOGIN';
export const loginTypes = makeActionTypes(LOGIN);

const SIGNUP = 'SINGUP';
export const signupTypes = makeActionTypes(SIGNUP);

const LOGOUT = 'LOGOUT';
export const logoutTypes = makeActionTypes(LOGOUT, false);

// Unique aciont types
export const GET_LOCAL_USER_SUCCESS = 'GET_LOCAL_USER_SUCCESS';
