// @flow

import _ from 'lodash';
import { Navigation } from 'react-native-navigation';
import type { Store } from 'redux';
import type { Persistor } from 'redux-persist/es/types';
import * as navigationLibName from '../constants/navigationLibNames';
import screenIDs from '../constants/screenIDs';
import { GET_LOCAL_USER_SUCCESS } from '../constants/actionTypes';

import type {
  NavigatorName,
} from '../flowTypes';

type Side = 'left' | 'right';

const LEFT_SIDE_MENU_ID = 'navigation.drawer.left';
const RIGHT_SIDE_MENU_ID = 'navigation.drawer.right';

export type RNN2 = {
  name: string,
  _store: Store,
  _persistor: Persistor,
  drawerVisibility: { left: boolean, right: boolean},
}

export default class NavigatorRNN2 {
  constructor(store:Store) {
    this.name = navigationLibName.RNN2;
    this._store = store;
    this._persistor = null;
    this.drawerVisibility = {
      left: false,
      right: false,
    };
  }

  drawerVisibility: { left: boolean, right: boolean}

  name: NavigatorName

  _store: Store

  _persistor: ?Persistor

  start = () => {
    // NOTE: we can change the initializing logic here.
    const state = this._store.getState();
    if (state.sensitive.user) {
      this._store.dispatch({ type: GET_LOCAL_USER_SUCCESS });
      this.goHome(); // offline usage.
    } else this.goAuth();
  }

 setPersistor = (persistor: Persistor) => { this._persistor = persistor; };

  goHome = () => Navigation.setRoot({
    root: {
      sideMenu: {
        left: {
          component: {
            name: screenIDs.PROFILE,
            id: LEFT_SIDE_MENU_ID,
            passProps: {
              setDrawerVisibility: this.setDrawerVisibility,
            },
          },
        },
        center: {
          stack: {
            id: 'main_stack',
            children: [
              {
                component: {
                  name: screenIDs.MAIN,
                  id: screenIDs.MAIN,
                  passProps: {
                    localPurge: this._persistor ? this._persistor.purge : () => console.log('no persistor!'),
                    openDrawer: this.openDrawer,
                    goAuth: this.goAuth,
                  },
                },
              },
            ],
          },
        },
      },
    },
  });

  goAuth = () => Navigation.setRoot({
    root: {
      stack: {
        id: 'Auth',
        children: [
          {
            component: {
              name: screenIDs.LOGIN,
              id: screenIDs.LOGIN,
              passProps: {
                goHome: this.goHome,
                pushScreen: this.pushScreen,
              },
            },
          },
        ],
      },
    },
  });

  pushScreen = (componentId: string, name:string, passProps: Object) => Navigation.push(componentId, {
    component: {
      name,
      passProps,
    },
  });

  _getDrawerId = (side:Side) => {
    if (side === 'left') return LEFT_SIDE_MENU_ID;
    return RIGHT_SIDE_MENU_ID;
  };

  setDrawerVisibility = (side:Side, visibility: boolean) => {
    this.drawerVisibility[side] = visibility;
  }

 toggleDrawer = (side: Side) => {
   const id = this._getDrawerId(side);
   const visibility = !this.drawerVisibility[side];
   Navigation.mergeOptions(id, {
     sideMenu: {
       [side]: {
         visible: !this.drawerVisibility[side],
       },
     },
   });
   this.drawerVisibility[side] = visibility;
 };

openDrawer = (side: Side) => {
  const id = this._getDrawerId(side);
  Navigation.mergeOptions(id, {
    sideMenu: {
      [side]: {
        visible: true,
      },
    },
  });
  this.drawerVisibility[side] = true;
};
}
