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
    backgroundColor: 'black',
  },
  font: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'white',
  },
});

const Screen = () => (
  <View style={styles.container}>
    <Text style={styles.font}> This is profile menu !</Text>
    {/* <Button
      onPress={() => pushIn(componentId, 'navigation.test.screen2')}
      title="Next Screen"
    /> */}
  </View>
);

export default Screen;
