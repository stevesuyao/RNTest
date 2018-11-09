/**
 * Container component of garage Screen
 */

/* eslint-disable react/no-unused-prop-types */
// @flow

import * as React from 'react';
import { Navigation } from 'react-native-navigation';


type Props = {}

const screenContainer = (WrappedComponent: React.ComponentType<any>, navigatorStyle: {}) => (

  class extends React.PureComponent<Props> {
    static defaultProps = {}

    constructor(props:Props) {
      super(props);
      Navigation.events().bindComponent(this);
    }

    componentDidUpdate() {
      // Check Bluetooth Status:
      console.log('component did update.');
    }

    static options() {
      return navigatorStyle;
    }

    componentDidApper() {
      console.log(this);
      console.log('component did appear.');
    }

    componentDidDisapper() {
      console.log(this);
      console.log('component did disappear');
    }

    navigationButtonPressed({buttonId }) {
      console.log(this);
      console.log(buttonId);
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
        />
      );
    }
  });

export default screenContainer;
