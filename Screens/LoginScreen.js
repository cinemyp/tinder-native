import React from 'react';
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import { useStoreon } from 'storeon/react';
import * as WebBrowser from 'expo-web-browser';

import authApi from '../api/AuthApi';
import { isIosPlatform } from '../constants';

export const LoginScreen = ({ navigation }) => {
  const { dispatch } = useStoreon('auth/update');

  const handlePressLogin = async () => {
    console.log(process.env);
    await authApi.signIn(WebBrowser.openAuthSessionAsync, dispatch);
  };

  return (
    <KeyboardAvoidingView
      style={styles['container']}
      behavior={isIosPlatform() ? 'padding' : 'height'}
    >
      <View style={styles['buttonContainer']}>
        <Button
          title={'sign in & start meeting'}
          containerStyle={styles['button']}
          buttonStyle={{
            backgroundColor: 'black',
          }}
          onPress={handlePressLogin}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
  },
  button: { width: '100%', borderRadius: 30 },
  registerText: {
    marginTop: 15,
    color: '#a5a5a5',
  },
  registerLink: {
    fontSize: 14,
  },
});
