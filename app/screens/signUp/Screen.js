/* eslint react/prefer-stateless-function: 0 */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
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

type Props = {
  name: string,
  signup: Function,
  componentId: string,
}

const Screen = ({
  name, signup,
}: Props) => (
  <View style={styles.container}>
    <Text style={styles.welcome}>{`This is ${name}`}</Text>
    <Button
      onPress={() => signup({ email: 'test', password: '123456' })}
      title="Signup"
    />
  </View>
);

export default Screen;
