// @flow

import {
  put,
  call,
  race,
  cancelled,
} from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { centraConfig } from '../services/config';
import type { ActionTypes } from '../constants/actionTypes';

export const errorHandle = (error: Object) => {
  let msg;
  if (!error.response) { // handle no response
    msg = error.message;
  } else {
    msg = error.response.data.message; // Network error
  }
  return msg;
};

export function* makeApiCall(apiMethod:Function, types: ActionTypes, ...args: any):any {
  try {
    console.log(...args);
    const { res } = yield race({
      res: call(apiMethod, ...args),
      timeout: call(delay, centraConfig.REQUEST_TIME_OUT),
    });
    if (!res || res === undefined) {
      throw new Error(centraConfig.TIME_OUT_ERROR);
    }
    console.log(res);
    yield put({ type: types.SUCCESS, payload: res.data });
  } catch (error) {
    const msg = errorHandle(error);
    yield put({ type: types.FAILURE, msg });
  } finally {
    if (yield cancelled()) {
      const msg = `${types.KEY} has been cancelled`;
      yield put({ type: types.CANCELLED, msg });
    }
  }
}
