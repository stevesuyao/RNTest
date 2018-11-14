/**
 * Container component of sigin Screen
 *
 * @flow
 */

/* eslint-disable react/no-unused-prop-types */

import * as React from 'react';
import _ from 'lodash';
import type { Props } from './propsType';


const screenContainer = (WrappedComponent: React.ComponentType<any>) => (

  class extends React.PureComponent<Props> {
    static defaultProps = {
      name: 'authScreen',
      login: _.noop,
      goHome: _.noop,
      goSignup: _.noop,
    }

    componentDidMount() {
      // Check Bluetooth Status:
      console.log('auth screen component did Mount.');
      console.log(this.props);
    }

    componentDidUpdate() {
      const { user, goHome } = this.props;
      console.log('auth screen component did Update.');
      if (user !== undefined) goHome();
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
