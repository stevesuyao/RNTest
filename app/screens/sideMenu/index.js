// @flow
import screenIDs from '../../constants/screenIDs';
import Screen from './Screen';
import screenContainer from './screenContainer';
import navigatorConfig from './navigatorConfig';
import { mapDispatchToProps } from './actions';
import { reducer, mapStateToProps } from './reducer';

export const Component = screenContainer(Screen);

const screenConfig = {
  screen: Component,
  id: screenIDs.PROFILE,
  reducer,
  navigatorConfig,
  mapDispatchToProps,
  mapStateToProps,
};

export default screenConfig;
