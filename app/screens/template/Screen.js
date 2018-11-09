/* eslint react/prefer-stateless-function: 0 */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFCF5',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

const Screen = () => (
  <View style={styles.container}>
    <Text style={styles.welcome}>Template</Text>
  </View>
);

export default Screen;
