import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, Text } from 'react-native-elements';
import { auth, firestore } from '../firebase';

export const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handlePressRegister = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const { uid } = auth.currentUser;
        firestore.collection('users').doc(uid).set({ name, email });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView style={styles['container']} behavior={'padding'}>
      <View style={styles['inputContainer']}>
        <TextInput
          placeholder={'Email'}
          style={styles['input']}
          value={email}
          onChangeText={(text) => setEmail(text)}
          onSubmitEditing={() => this.nameInput.focus()}
          keyboardType={'email-address'}
          autoCompleteType={'email'}
          autoCapitalize={'none'}
          autoCorrect={false}
          returnKeyType={'next'}
        />
        <TextInput
          placeholder={'Name'}
          ref={(input) => (this.nameInput = input)}
          style={styles['input']}
          value={name}
          onChangeText={(text) => setName(text)}
          onSubmitEditing={() => this.passwordInput.focus()}
          autoCorrect={false}
          returnKeyType={'next'}
        />
        <TextInput
          placeholder={'Password'}
          ref={(input) => (this.passwordInput = input)}
          style={styles['input']}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
      </View>
      <View style={styles['buttonContainer']}>
        <Button
          title={'Register'}
          buttonStyle={styles['button']}
          onPress={handlePressRegister}
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
