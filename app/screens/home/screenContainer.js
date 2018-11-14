/**
 * Container component of garage Screen
 */

/* eslint-disable react/no-unused-prop-types */
// @flow

import * as React from 'react';
import _ from 'lodash';
import type { Props } from './propsType';

const screenContainer = (WrappedComponent: React.ComponentType<any>) => (

  class extends React.PureComponent<Props> {
    static defaultProps = {
      localPurge: _.noop,
      goAuth: _.noop,
      user: {},
    }

    componentDidMount() {
      console.log(' home screen did mount.');
      console.log(this.props);
    }

    componentDidUpdate() {
      const { user, goAuth, localPurge } = this.props;
      if (!user) {
        console.log('log out, no user');
        localPurge();
        goAuth();
      }
    }

    render() {
      return (
        <WrappedComponent />
      );
    }
  });

export default screenContainer;
