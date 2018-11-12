/**
 * Sagas for managing local data.
 *
 * @flow
 */

import { take, put } from 'redux-saga/effects';
import { defaultAppActionTypes, logoutTypes } from '../constants/actionTypes';

export default function* localPurgeFlow():any {
  while (true) {
    yield take(logoutTypes.SUCCESS);
    yield put({ type: defaultAppActionTypes.APP_RESET });
  }
}
