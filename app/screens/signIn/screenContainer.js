/**
 * Container component of garage Screen
 */

/* eslint-disable react/no-unused-prop-types */
// @flow

import * as React from 'react';
import { Navigation } from 'react-native-navigation';


type Props = {
  name: string,
  login: Function,
}

const screenContainer = (WrappedComponent: React.ComponentType<any>, navigatorStyle: {}) => (

  class extends React.PureComponent<Props> {
    static defaultProps = {
      name: 'authScreen',
      signIn: () => null,
    }

    constructor(props:Props) {
      super(props);
      Navigation.events().bindComponent(this);
    }

    componentDidMount() {
      // Check Bluetooth Status:
      console.log('auth screen component did update.');
      console.log(this.props)
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

    navigationButtonPressed({ buttonId }) {
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
