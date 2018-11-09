// @flow
// import { connect } from 'react-redux';
import screenIDs from '../../constants/screenIDs';
import Screen from './Screen';
import screenContainer from './screenContainer';
import navigatorStyle from './navigatorStyle';
// import login from './action';

// const mapStateToProps = (state: Object) => (
//   {
//     isNetConnected: state.isNetConnected,
//   }
// );
//
// const mapDispatchToProps = dispatch => (
//   {
//     login: data => dispatch(login(data)),
//   }
// );

// export const Component = connect(mapStateToProps, mapDispatchToProps)(screenContainer(Screen, navigatorStyle));

export const Component = screenContainer(Screen, navigatorStyle);

const screenConfig = {
  screen: Component,
  id: screenIDs.JOYSTICK,
};

export default screenConfig;
