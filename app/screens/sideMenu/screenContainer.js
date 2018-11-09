/**
 * Container component of garage Screen
 */

/* eslint-disable react/no-unused-prop-types */
// @flow

import * as React from 'react';
import { Navigation } from 'react-native-navigation';

const screenContainer = (WrappedComponent: React.ComponentType<any>, navigatorStyle: {}) => (

  class extends React.PureComponent {
    constructor(props) {
      super(props);
      Navigation.events().bindComponent(this);
    }

    componentDidMount() {
      console.log('component did mount.');
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
        <WrappedComponent />
      );
    }
  });

export default screenContainer;
