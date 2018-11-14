/**
 * hoc for setting RNN2 navigatorStyles and events.
 *
 * @flow
 */

/* eslint no-unused-expressions : 0 */
/* eslint class-methods-use-this: ["error", { "exceptMethods": ["componentDidAppear","componentDidDisappear", "navigationButtonPressed"] }] */

import React from 'react';
import { Navigation } from 'react-native-navigation';
import type { ComponentType as React$ComponentType } from 'react';
import type { RNN2Config } from '../flowTypes';

type Props = {
  componentId: string,
};

const wrapComponentWithRNN = (
  WrappedComponent: React$ComponentType<any>,
  config: RNN2Config,
) => (
  class extends React.PureComponent<Props> {
    constructor(props:Props) {
      super(props);
      Navigation.events().bindComponent(this);
    }

    static options() {
      return { ...config.navigatorStyle };
    }

    componentDidAppear() {
      const { componentId } = this.props;
      console.log(componentId, 'did appear');
      const { navigatorEvents } = config;
      if (!navigatorEvents) return;
      const { componentDidApper } = navigatorEvents;
      if (componentDidApper) componentDidApper();
    }

    componentDidDisappear() {
      const { componentId } = this.props;
      console.log(componentId, 'did disappear');
      const { navigatorEvents } = config;
      if (!navigatorEvents) return;
      const { componentDidDisappear } = navigatorEvents;
      if (componentDidDisappear) componentDidDisappear();
    }

    navigationButtonPressed({ buttonId } : {buttonId: string, componentId: string}) {
      const { navigatorEvents } = config;
      if (!navigatorEvents) return;
      const { navigationButtonPressed } = navigatorEvents;
      if (navigationButtonPressed) navigationButtonPressed(buttonId, this.props);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }
);

export default wrapComponentWithRNN;
