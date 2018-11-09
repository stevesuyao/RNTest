/*
 * This file contains the sagas used for async actions in the app. It's divided into
 * "effects" that the sagas call (`authorize` and `logout`) and the actual sagas themselves,
 *  which listen for actions.
 *
 * @flow
 */

import {
  take,
  fork,
  call,
  cancel,
} from 'redux-saga/effects';
import {
  LOGIN,
  SIGNUP,
  LOGOUT,
  makeActionTypes,
} from '../constants/actionTypes';
import { makeApiCall } from './utils';
import * as CentraAPIs from '../services/mockCentraApis';
import type { LoginData } from '../flowTypes';

const loginTypes = makeActionTypes(LOGIN);
const signupTypes = makeActionTypes(SIGNUP);
const logoutTypes = makeActionTypes(LOGOUT);

export function* authorize(payload: LoginData):any {
  return yield makeApiCall(CentraAPIs.login, loginTypes, payload);
}

export function* signup(payload: LoginData):any {
  // TODO: need redux-persist here: yield call(LocalAPIs.recordUser, res.data);
  return yield makeApiCall(CentraAPIs.signup, signupTypes, payload);
}


export function* logout():any {
  return yield makeApiCall(CentraAPIs.logout, logoutTypes);
}


// Login flow
export function* loginFlow():any {
  while (true) {
    // NOTE: yield take `LOGIN_REQUEST_SUCCESS` for existed user.
    // TODO: handle the expired token.
    const action = yield take([loginTypes.REQUEST, loginTypes.SUCCESS]);
    const task = action.type === loginTypes.REQUEST ? yield fork(authorize, action.payload) : null;
    const nextAction = yield take([logoutTypes.REQUEST, logoutTypes.FAILURE]);
    if (task !== null) yield cancel(task);
    if (nextAction.type === logoutTypes.REQUEST) yield call(logout);
  }
}

// Signup flow
export function* signupFlow():any {
  while (true) {
    const { payload } = yield take(signupTypes.REQUEST);
    const task = yield fork(signup, payload); // non blocking call
    const action = yield take([logoutTypes.REQUEST, logoutTypes.FAILURE]);
    if (task !== null) yield cancel(task);
    if (action.type === logoutTypes.REQUEST) yield call(logout);
  }
}
