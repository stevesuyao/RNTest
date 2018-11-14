// @flow

import { createReducer } from '../../reducers/createReducers';
import { signupTypes } from '../../constants/actionTypes';

export const reducer = createReducer(signupTypes);

// export const mapStateToProps = (state: Object) => (
//   {
//     isNetConnected: state.isNetConnected,
//   }
// );

export const mapStateToProps = null;
