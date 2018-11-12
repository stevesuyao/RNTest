/**
 * Default app reducer.
 *
 * @flow
 */

import { loginTypes, signupTypes, logoutTypes } from '../constants/actionTypes';

const initialState = {};

const sensitiveReducer = (state:Object = initialState, action: Object) => {
  const { type } = action;

  switch (type) {
    case loginTypes.SUCCESS:
    case signupTypes.SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case logoutTypes.SUCCESS:
      return {
        user: null,
      };
    default:
      return state;
  }
};

export default sensitiveReducer;
