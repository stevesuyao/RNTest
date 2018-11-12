import { Navigation } from 'react-native-navigation';
import screenIDs from '../constants/screenIDs';

export const goHome = () => Navigation.setRoot({
  root: {
    sideMenu: {
      left: {
        component: {
          name: screenIDs.PROFILE,
          passProps: {
            text: 'This is a left side menu screen',
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
              },
            },
          ],
        },
      },
    },
  },
});

export const goAuth = (passProps: Object = null) => Navigation.setRoot({
  root: {
    stack: {
      id: 'Auth',
      children: [
        {
          component: {
            name: screenIDs.LOGIN,
            passProps,
          },
        },
      ],
    },
  },
});

export const popOut = id => Navigation.pop(id);

export const pushIn = (id, name) => Navigation.push(id, { component: { name } });

export const startInitalScreen = (passProps: Object = null) => {
  Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setDefaultOptions({ // global screen's style. Must set before setRoot();
      layout: {
      // backgroundColor: 'white',
        orientation: ['portrait'], // An array of supported orientations
      },
    });

    Navigation.setRoot({
      root: {
        component: {
          name: screenIDs.INIT,
          passProps,
        },
      },
    });
  });
};
