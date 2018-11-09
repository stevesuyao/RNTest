/**
* login action
*/

// @flow
import type { Dispatch } from 'redux';
import { makeActionTypes } from '../../constants/actionTypes';

export type Payload = {};

// Login action types
const prefix = 'PREFIX';

export const types = makeActionTypes(prefix);

const action = (payload: Payload) => ({
  type: types.REQUEST,
  payload,
});

export const mapDispatchToProps = (dispatch: Dispatch) => (
  {
    login: (data: Payload) => dispatch(action(data)),
  }
);
