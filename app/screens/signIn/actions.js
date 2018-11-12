/**
* login action
*
* @flow
*/

import type { Dispatch } from 'redux';
import { loginTypes, logoutTypes } from '../../constants/actionTypes';
import type { LoginData } from '../../flowTypes';

// Define actions
export const login = (payload: LoginData) => ({
  type: loginTypes.REQUEST,
  payload,
});

export const logout = () => ({ type: logoutTypes.REQUEST });

// Map dispath to props.
export const mapDispatchToProps = (dispatch: Dispatch) => (
  {
    login: (data: LoginData) => dispatch(login(data)),
    logout: () => dispatch(logout()),
  }
);
