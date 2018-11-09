/*
 * Methods of creating reducers.
 *
 * @flow
 */


// import { CLEAR_MESSAGE, SEND_MESSAGE } from '../constants/actionTypes';
//
// type Message = {
//   content: string,
//   type: string,
// };
//
// type MsgAction = {
//   type: string,
//   msg: Message,
// }
//
// type MessageState = {
//   loading: boolean,
//   message: null | Message,
// };
//
// const initialState = {
//   loading: false,
//   message: null,
// };
//
// export const messageReducer = (state: MessageState = initialState, action: MsgAction):MessageState => {
//   const { type, msg } = action;
//
//   switch (type) {
//     case CLEAR_MESSAGE:
//       return {
//         ...state,
//         message: null,
//       };
//     case SEND_MESSAGE:
//       return {
//         ...state,
//         loading: false,
//         message: msg,
//       };
//     default:
//       return state;
//   }
// };

// import { makeActionTypes } from '../constants/actionTypes';
import reduceReducers from 'reduce-reducers'; // NOTE: use reduceReducer to make a shared state.
import type { Reducer } from 'redux';
import { persistReducer } from 'redux-persist';
import type { PersistConfig } from 'redux-persist/es/types';
import _ from 'lodash';
import * as MessageTypes from '../constants/messageTypes';
import type { ActionTypes } from '../constants/actionTypes';
import type { ScreenConfig } from '../flowTypes';

export const createReducer = (types: ActionTypes):Function => {
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
            type: MessageTypes.ERROR,
          },
        };
      case CANCELLED:
        return {
          ...state,
          isLoading: false,
          message: {
            content: action.msg,
            type: MessageTypes.WARN,
          },
        };
      default:
        return state;
    }
  };

  return reducer;
};

export const createRootReducer = (screens: Array<ScreenConfig>) => {
  const extract = (i: ScreenConfig) => i.reducer;
  const reducers = _.compact(_.map(screens, extract)); // remove falsey values.
  return reduceReducers(...reducers);
};

export const createPersistedReducer = (config: PersistConfig, reducer: Reducer) => persistReducer(config, reducer);
