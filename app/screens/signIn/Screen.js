// @flow

/* eslint react/prefer-stateless-function: 0 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  AsyncStorage,
} from 'react-native';
import screenIDs from '../../constants/screenIDs'

import type { Props } from './propsType';

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

const getLocalData = async () => {
  try {
    const res = await AsyncStorage.getItem('persist:ocuMobile');
    if (res !== null) {
      // We have data!!
      const value = JSON.parse(res);
      console.log(value);
      // const user = JSON.parse(value.user);
      // console.log(user);
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

const Screen = ({
  name, componentId, login, pushScreen,
}: Props) => (
  <View style={styles.container}>
    <Text style={styles.welcome}>{`This is ${name}`}</Text>
    <Button
      onPress={() => login({ email: 'test', password: '123456' })}
      title="SignIn"
    />
    <Button
      onPress={() => pushScreen(componentId, screenIDs.SIGNUP, null)}
      title="Signup"
    />
    <Button
      onPress={() => {
        getLocalData();
      }}
      title="get localData"
    />
    {/* <Button
      onPress={() => {
        localPurge();
      }}
      title="local purge"
    /> */}
  </View>
);

export default Screen;
