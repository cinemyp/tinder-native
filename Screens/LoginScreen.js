import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, Text } from 'react-native-elements';
import { auth } from '../firebase';

export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handlePressRegisterLink = () => {
    navigation.navigate('Register');
  };

  const handlePressLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log(user.email);
      })
      .catch((error) => console.log(error.message));
  };

  // useEffect((user) => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       navigation.replace('HomeTabs');
  //     }
  //   });

  //   return unsubscribe;
  // }, []);

  return (
    <KeyboardAvoidingView style={styles['container']} behavior={'padding'}>
      <View style={styles['inputContainer']}>
        <TextInput
          placeholder={'Email'}
          style={styles['input']}
          value={email}
          onChangeText={(text) => setEmail(text)}
          onSubmitEditing={() => this.passwordInput.focus()}
          keyboardType={'email-address'}
          autoCompleteType={'email'}
          autoCapitalize={'none'}
          autoCorrect={false}
          returnKeyType={'next'}
        />
        <TextInput
          placeholder={'Password'}
          ref={(input) => (this.passwordInput = input)}
          style={styles['input']}
          value={password}
          onChangeText={(text) => setPassword(text)}
          keyboardType={'visible-password'}
          autoCompleteType={'password'}
          returnKeyType={'go'}
          secureTextEntry
        />
      </View>
      <View style={styles['buttonContainer']}>
        <Button
          title={'Login'}
          buttonStyle={styles['button']}
          onPress={handlePressLogin}
        />
        <Text style={styles['registerText']}>You don't have an account?</Text>
        <Button
          title={'Register'}
          type={'clear'}
          titleStyle={styles['registerLink']}
          onPress={handlePressRegisterLink}
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
  button: {
    width: '100%',
  },
  registerText: {
    marginTop: 15,
    color: '#a5a5a5',
  },
  registerLink: {
    fontSize: 14,
  },
});
