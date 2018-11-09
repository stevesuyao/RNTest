/* eslint react/prefer-stateless-function: 0 */
import React from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  font: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

const Screen = () => (
  <View style={styles.container}>
    <Text style={styles.font}> This is home screen !</Text>
    {/* <Button
      onPress={() => pushIn(componentId, 'navigation.test.screen2')}
      title="Next Screen"
    /> */}
  </View>
);

export default Screen;
