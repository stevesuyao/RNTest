import reduceReducers from 'reduce-reducers';
import { createReducer } from '../../reducers/createReducers';
import { loginTypes, logoutTypes } from '../../constants/actionTypes';

const loginReducer = createReducer(loginTypes);
const logoutReducer = createReducer(logoutTypes);

export const reducer = reduceReducers(loginReducer, logoutReducer);

export const mapStateToProps = (state: Object) => (
  {
    isNetConnected: state.isNetConnected,
  }
);
