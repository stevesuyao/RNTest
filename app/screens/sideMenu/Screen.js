/* eslint react/prefer-stateless-function: 0 */
import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
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

type Props = {
  // user: Object, // TODO: add UserType
  logout: Function,
}

const Screen = ({ logout }:Props) => (
  <View style={styles.container}>
    <Text style={styles.font}> This is profile menu !</Text>
    <Button
      onPress={logout}
      title="logout"
    />
  </View>
);

export default Screen;
