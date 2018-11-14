// @flow
import screenIDs from '../../constants/screenIDs';
import Screen from './Screen';
import screenContainer from './screenContainer';
import navigatorConfig from './navigatorConfig';
import { reducer, mapStateToProps } from './reducer';
import { mapDispatchToProps } from './action';

const screen = screenContainer(Screen);

const screenConfig = {
  screen,
  id: screenIDs.MAIN,
  reducer,
  navigatorConfig,
  mapStateToProps,
  mapDispatchToProps,
};

export default screenConfig;
