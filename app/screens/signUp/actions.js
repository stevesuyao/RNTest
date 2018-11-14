/**
* signup actions
*
* @flow
*/

import type { Dispatch } from 'redux';
import { signupTypes } from '../../constants/actionTypes';
import type { LoginData } from '../../flowTypes';

// Define actions
export const signup = (payload: LoginData) => ({
  type: signupTypes.REQUEST,
  payload,
});

// Map dispath to props.
export const mapDispatchToProps = (dispatch: Dispatch) => (
  {
    signup: (data: LoginData) => dispatch(signup(data)),
  }
);
