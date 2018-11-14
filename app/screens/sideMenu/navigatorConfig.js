/*
 * RNN2 navigator config
 *
 * @flow
 */

import type { Props } from './propsType';

const navigatorStyle = {};

const navigatorEvents = { // NOTE: side menu nvaigator events only work on iOS
  componentDidAppear: (props: Props) => {
    props.setDrawerVisibility(true);
  },
  componentDidDisappear: (props:Props) => {
    props.setDrawerVisibility(false);
  },
};

export default {
  navigatorStyle,
  navigatorEvents,
};
