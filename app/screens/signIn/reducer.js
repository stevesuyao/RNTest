import { createReducer } from '../../reducers/createReducers';
import { loginTypes as types } from './actions';

export const reducer = createReducer(types);

export const mapStateToProps = (state: Object) => (
  {
    isNetConnected: state.isNetConnected,
  }
);
