// @flow

const navigatorStyle = {
  topBar: {
    title: {
      text: 'Signup',
      alignment: 'center',
    },
    visible: true,
    drawBehind: true,
    animate: true,
    leftButtons: [
      {
        id: 'RNN.back', // NOTE: native back button id is `RNN.back`
        enabled: true,
        color: 'balck',
      },
    ],
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
