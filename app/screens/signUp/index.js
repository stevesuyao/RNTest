// @flow

import screenIDs from '../../constants/screenIDs';
import Screen from './Screen';
import screenContainer from './screenContainer';
import navigatorConfig from './navigatorConfig';
import { mapDispatchToProps } from './actions';
import { reducer, mapStateToProps } from './reducer';

const screen = screenContainer(Screen);

const screenConfig = {
  screen,
  id: screenIDs.SIGNUP,
  reducer,
  navigatorConfig,
  mapStateToProps,
  mapDispatchToProps,
};

export default screenConfig;
