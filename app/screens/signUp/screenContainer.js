/**
 * Container component of garage Screen
 *
 * @flow
 */

/* eslint-disable react/no-unused-prop-types */

import _ from 'lodash';
import * as React from 'react';

type Props = {
  name: string,
  signup: Function,
}

const screenContainer = (WrappedComponent: React.ComponentType<any>) => (

  class extends React.PureComponent<Props> {
    static defaultProps = {
      name: 'signupScreen',
      signup: _.noop,
    }

    componentDidMount() {
      // Check Bluetooth Status:
      console.log('auth screen component did update.');
      console.log(this.props);
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
