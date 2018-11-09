/* eslint react/prefer-stateless-function: 0 */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  AsyncStorage,
} from 'react-native';
import { pushIn } from '../../services/navigation';
import screenIDs from '../../constants/screenIDs';

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
  login: Function,
  componentId: string,
}

const getLocalData = async () => {
  try {
    const value = await AsyncStorage.getItem('persist:ocuMobile');
    if (value !== null) {
      // We have data!!
      console.log(value);
    } else console.log('get no value in localStorage!');
  } catch (error) {
    console.log(error);
  }
};

const getLocalKeys = async () => {
  AsyncStorage.getAllKeys((err, keys) => {
    console.log(keys);
  });
};

const Screen = ({ name, login, componentId }: Props) => (
  <View style={styles.container}>
    <Text style={styles.welcome}>{`This is ${name}`}</Text>
    <Button
      onPress={() => login({ email: 'test', password: '123456' })}
      title="SignIn"
    />
    <Button
      onPress={() => {
        // pushIn(componentId, screenIDs.JOYSTICK);
        getLocalData();
      }}
      title="test"
    />
  </View>
);

export default Screen;
