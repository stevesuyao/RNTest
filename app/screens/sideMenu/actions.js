/**
* logout action
*
* @flow
*/

import type { Dispatch } from 'redux';
import { logoutTypes } from '../../constants/actionTypes';


export const logout = () => ({ type: logoutTypes.REQUEST });

// Map dispath to props.
export const mapDispatchToProps = (dispatch: Dispatch) => (
  {
    logout: () => dispatch(logout()),
  }
);
