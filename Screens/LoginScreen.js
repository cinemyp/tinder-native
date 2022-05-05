import React from 'react';
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import { useStoreon } from 'storeon/react';
import * as WebBrowser from 'expo-web-browser';

import authApi from '../api/AuthApi';
import { isIosPlatform } from '../constants';
import SocketContext from '../contexts';

export const LoginScreen = ({ navigation }) => {
  const { dispatch, currentUser } = useStoreon('auth/update', 'currentUser');
  const [logged, setLogged] = React.useState(null);

  const socket = React.useContext(SocketContext);
  const handlePressLogin = async () => {
    const result = await authApi.signIn(
      WebBrowser.openAuthSessionAsync,
      dispatch
    );
    if (!result) {
      dispatch('user/get');
      setLogged(true);
    } else if (result === true) {
      navigation.navigate('Register');
    }
  };

  React.useEffect(() => {
    if (currentUser._id && logged) {
      socket.auth = { customId: currentUser._id };
      socket.connect();
      dispatch('auth/update', { isSignedIn: true });
    }
  }, [currentUser, logged]);

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
