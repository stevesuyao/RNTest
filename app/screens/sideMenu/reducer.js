/*
 * reducers of sideMenu
 */
import { createReducer } from '../../reducers/createReducers';
import { logoutTypes } from '../../constants/actionTypes';

export const reducer = createReducer(logoutTypes);

export const mapStateToProps = (state: Object) => (
  {
    user: state.sensitive.user,
  }
);
