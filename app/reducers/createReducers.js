/*
 * Methods of creating reducers.
 *
 * @flow
 */

import reduceReducers from 'reduce-reducers'; // NOTE: use reduceReducer to make a shared state.
// import { combineReducers } from 'redux';
import type { Reducer } from 'redux';
import { persistReducer } from 'redux-persist';
import type { PersistConfig } from 'redux-persist/es/types';
import _ from 'lodash';
import { messageTypes } from '../constants/messages';
import type { ActionType, ScreenConfig } from '../flowTypes';


export const createReducer = (types: ActionType):Function => {
  const {
    REQUEST,
    SUCCESS,
    FAILURE,
    CANCELLED,
  } = types;
  const initState = { isLoading: false, message: null };
  const reducer = (state = initState, action) => {
    switch (action.type) {
      case REQUEST:
        return {
          ...state,
          isLoading: true,
        };
      case SUCCESS:
        return {
          ...state,
          isLoading: false,
          ...action.payload,
        };
      case FAILURE:
        return {
          ...state,
          isLoading: false,
          message: {
            content: action.msg,
            type: messageTypes.ERROR,
          },
        };
      case CANCELLED:
        return {
          ...state,
          isLoading: false,
          message: {
            content: action.msg,
            type: messageTypes.WARN,
          },
        };
      default:
        return state;
    }
  };

  return reducer;
};

export const createRootReducer = (screens: Array<ScreenConfig>, ...reducers: Reducer) => {
  const extract = (i: ScreenConfig) => i.reducer;
  const screenReducers = _.compact(_.map(screens, extract)); // remove falsey values.
  return reduceReducers(...screenReducers, ...reducers);
};

export const createPersistedReducer = (config: PersistConfig, reducer: Reducer) => persistReducer(config, reducer);
