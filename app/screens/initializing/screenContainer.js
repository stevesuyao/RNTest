/**
 * Container component of garage Screen
 */

/* eslint-disable react/no-unused-prop-types */
// @flow

import * as React from 'react';
import { AsyncStorage } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { goHome, goAuth } from '../../services/navigation';

const USER_KEY = 'root';

const screenContainer = (WrappedComponent: React.ComponentType<any>, navigatorStyle: {}) => (

  class extends React.PureComponent {
    constructor(props) {
      super(props);
      Navigation.events().bindComponent(this);
    }

    async componentDidMount() {
      try {
        console.log('dfjkdfjkd');
        const user = await AsyncStorage.getItem(USER_KEY);
        console.log(`user: ${user}`);
        if (user) {
          goHome();
        } else {
          goAuth();
        }
      } catch (err) {
        console.log(`error: ${err}`);
        goAuth();
      }
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
