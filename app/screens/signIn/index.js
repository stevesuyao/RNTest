// @flow

import { connect } from 'react-redux';
import screenIDs from '../../constants/screenIDs';
import Screen from './Screen';
import screenContainer from './screenContainer';
import navigatorStyle from './navigatorStyle';
import { mapDispatchToProps } from './actions';
import { reducer, mapStateToProps } from './reducer';

const Component = connect(mapStateToProps, mapDispatchToProps)(screenContainer(Screen, navigatorStyle));

const screenConfig = {
  screen: Component,
  id: screenIDs.LOGIN,
  reducer,
};

export default screenConfig;
