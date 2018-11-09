/*
 * Actions types.
 */

// @flow

// Message action types
export const CLEAR_MESSAGE = 'CLEAR_MESSAGE';
export const SEND_MESSAGE = 'SEND_MESSAGE';

// Common action prefix
export const LOGIN = 'LOGIN';
export const SIGNUP = 'SINGUP';
export const LOGOUT = 'LOGOUT';

// Suffix
const REQUEST_TYPE = '_REQUEST';
const SUCCESS_TYPE = '_REQUEST_SUCCESS';
const FAILURE_TYPE = '_REQUEST_FAIL';
const CANCELLED_TYPE = '_REQUEST_CANCELLED';

export type ActionTypes = {
  REQUEST: string,
  SUCCESS: string,
  FAILURE: string,
  CANCELLED: string,
  KEY: string,
};

export const makeActionTypes = (prefix: string):ActionTypes => ({
  REQUEST: prefix + REQUEST_TYPE,
  SUCCESS: prefix + SUCCESS_TYPE,
  FAILURE: prefix + FAILURE_TYPE,
  CANCELLED: prefix + CANCELLED_TYPE,
  KEY: prefix,
});
