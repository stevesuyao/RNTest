/**
 * Default app reducer.
 *
 * @flow
 */

import { defaultAppActionTypes } from '../constants/actionTypes';

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

const initialState = {};

const defaultReducer = (state:Object = initialState, action: Object) => {
  const { type } = action;

  switch (type) {
    case defaultAppActionTypes.APP_RESET:
    console.log('te');
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default defaultReducer;
