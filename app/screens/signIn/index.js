// @flow

import screenIDs from '../../constants/screenIDs';
import Screen from './Screen';
import screenContainer from './screenContainer';
import { mapDispatchToProps } from './actions';
import { reducer, mapStateToProps } from './reducer';
import navigatorConfig from './navigatorConfig';

const screen = screenContainer(Screen);

const screenConfig = {
  screen,
  id: screenIDs.LOGIN,
  reducer,
  navigatorConfig,
  mapStateToProps,
  mapDispatchToProps,
};

export default screenConfig;
