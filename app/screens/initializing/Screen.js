/* eslint react/prefer-stateless-function: 0 */
import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Screen = () => (
  <View style={styles.container} />
);

export default Screen;
