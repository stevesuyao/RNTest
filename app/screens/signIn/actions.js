/**
* login action
*
* @flow
*/

import type { Dispatch } from 'redux';
import { LOGIN, makeActionTypes } from '../../constants/actionTypes';
import type { LoginData } from '../../flowTypes';

// Create action types.
export const loginTypes = makeActionTypes(LOGIN);

// Define actions
const login = (payload: LoginData) => ({
  type: loginTypes.REQUEST,
  payload,
});

// Map dispath to props.
export const mapDispatchToProps = (dispatch: Dispatch) => (
  {
    login: (data: LoginData) => dispatch(login(data)),
  }
);
