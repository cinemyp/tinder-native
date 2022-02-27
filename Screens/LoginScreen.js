import React from 'react';
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import { useStoreon } from 'storeon/react';
import authApi from '../api/AuthApi';
import { isIosPlatform } from '../constants';
import * as WebBrowser from 'expo-web-browser';

const discovery = {
  authorizationEndpoint:
    'https://us-central1-tinder-native-5420b.cloudfunctions.net/redirect/',
  tokenEndpoint:
    'https://us-central1-tinder-native-5420b.cloudfunctions.net/token/',
};

export const LoginScreen = ({ navigation }) => {
  const { dispatch } = useStoreon('user/get');

  const handlePressLogin = async () => {
    // console.log(request);
    // promptAsync();
    const authGrantState = await fetch(
      'https://us-central1-tinder-native-5420b.cloudfunctions.net/redirect/'
    )
      .then(({ url }) =>
        WebBrowser.openAuthSessionAsync(url, 'exp://localhost:19000')
      )
      .then((code) => {
        let result = code.url.match(/\?.*code=(.*)&.*state=(.*)/);
        return { code: result[1], state: result[2] };
      });

    fetch(
      `https://us-central1-tinder-native-5420b.cloudfunctions.net/token/?code=${authGrantState.code}&state=${authGrantState.state}`
    )
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
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
