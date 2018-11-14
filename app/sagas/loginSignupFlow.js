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
  loginTypes,
  signupTypes,
  logoutTypes,
  GET_LOCAL_USER_SUCCESS,
} from '../constants/actionTypes';
import { makeApiCall } from './utils';
import * as CentraAPIs from '../services/mockCentraApis';
import type { LoginData } from '../flowTypes';


export function* authorize(payload: LoginData):any {
  return yield makeApiCall(CentraAPIs.login, loginTypes, payload);
}

export function* signup(payload: LoginData):any {
  // TODO: need redux-persist here: yield call(LocalAPIs.recordUser, res.data);
  return yield makeApiCall(CentraAPIs.signUp, signupTypes, payload);
}


export function* logout():any {
  return yield makeApiCall(CentraAPIs.logout, logoutTypes);
}


// Login flow
export function* loginFlow():any {
  while (true) {
    // NOTE: take `GET_LOCAL_USER_SUCCESS` for existed user.
    // TODO: handle the expired token.
    const action = yield take([loginTypes.REQUEST, GET_LOCAL_USER_SUCCESS]);
    const task = action.type === loginTypes.REQUEST ? yield fork(authorize, action.payload) : null;
    const nextAction = yield take([logoutTypes.REQUEST, loginTypes.FAILURE]);
    if (task !== null) yield cancel(task);
    if (nextAction.type === logoutTypes.REQUEST) yield call(logout);
  }
}

// Signup flow
export function* signupFlow():any {
  while (true) {
    const { payload } = yield take(signupTypes.REQUEST);
    const task = yield fork(signup, payload); // non blocking call
    const action = yield take([logoutTypes.REQUEST, signupTypes.FAILURE]);
    if (task !== null) yield cancel(task);
    if (action.type === logoutTypes.REQUEST) yield call(logout);
  }
}
