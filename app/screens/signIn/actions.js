/**
* login action
*
* @flow
*/

import type { Dispatch } from 'redux';
import { loginTypes } from '../../constants/actionTypes';
import type { LoginData } from '../../flowTypes';

// Define actions
export const login = (payload: LoginData) => ({
  type: loginTypes.REQUEST,
  payload,
});

// Map dispath to props.
export const mapDispatchToProps = (dispatch: Dispatch) => (
  {
    login: (data: LoginData) => dispatch(login(data)),
  }
);
