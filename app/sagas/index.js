/**
 * The root saga is what we actually send to Redux's middleware. In here we fork
 * each saga so that they are all "active" and listening.
 * Sagas are fired once at the start of an app and can be thought of as processes running
 * in the background, watching actions dispatched to the store.
 *
 * @flow
 */

import { all, fork } from 'redux-saga/effects';
import { loginFlow, signupFlow } from './loginSignupFlow';
import localPurgeFlow from './localStorageManagement';


export default function* rootSaga():any {
  // watch and fork pattern
  yield all([
    fork(loginFlow),
    fork(signupFlow),
    fork(localPurgeFlow),
  ]);
}
