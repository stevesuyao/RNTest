/*
 * RNN2 navigator config
 *
 * @flow
 */

import type { Props } from './propsType';
import { iconImagesConfig } from '../../configs';
// import screenIDs from '../constants/screenIDs';

const navigatorStyle = {
  sideMenu: {
    left: {
      visible: false,
      enabled: true,
    },
  },
  topBar: {
    title: {
      text: 'Home',
      alignment: 'center',
    },
    visible: true,
    drawBehind: true,
    animate: true,
    leftButtons: [{
      id: 'menu',
      color: 'black',
      imgName: iconImagesConfig.menu.key,
    }],
    rightButtons: [
      {
        id: 'profile',
        color: 'black',
        imgName: iconImagesConfig.profile.key,
      },
    ],
  },
};

const navigatorEvents = {
  navigationButtonPressed: (buttonId: string, props: Props) => {
    switch (buttonId) {
      case 'menu':
        props.openDrawer('left');
        break;
      case 'profile':
        console.log('buton id is: ', buttonId);
        break;
      default:
    }
  },
};

export default {
  navigatorStyle,
  navigatorEvents,
};
