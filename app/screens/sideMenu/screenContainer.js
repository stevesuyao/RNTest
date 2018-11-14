/**
 * Container component of garage Screen
 *
 * @flow
 */

/* eslint-disable react/no-unused-prop-types */

import _ from 'lodash';
import * as React from 'react';
import type { Props } from './propsType';

const screenContainer = (WrappedComponent: React.ComponentType<any>) => (

  class extends React.PureComponent<Props> {
    static defaultProps = {
      user: {},
      logout: _.noop,
    }


    componentDidMount() {
      console.log('side menu component did mount.');
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
