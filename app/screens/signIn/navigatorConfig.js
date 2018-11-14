/*
 * RNN2 navigator config
 *
 * @flow
 */

// import type { Props } from './propsType';
// import screenIDs from '../constants/screenIDs';

const navigatorStyle = {
  topBar: {
    title: {
      text: 'Auth',
      alignment: 'center',
    },
    visible: true,
    drawBehind: true,
    animate: true,
  },
  statusBar: {
    visible: true,
    style: 'dark',
    backgroundColor: 'white',
  },
};

const navigatorEvents = null;

export default {
  navigatorStyle,
  navigatorEvents,
};
