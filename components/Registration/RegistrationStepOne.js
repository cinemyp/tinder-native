import React from 'react';
import { TextInput, View } from 'react-native';
import { Button } from 'react-native-elements';

export const RegistrationStepOne = ({ setState, next, values, styles }) => {
  return (
    <>
      <View style={styles['inputContainer']}>
        <TextInput
          placeholder={'Email'}
          style={styles['input']}
          value={values.email}
          onChangeText={(text) =>
            setState((prevState) => ({ ...prevState, email: text }))
          }
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
          value={values.name}
          onChangeText={(text) =>
            setState((prevState) => ({ ...prevState, name: text }))
          }
          onSubmitEditing={() => this.passwordInput.focus()}
          autoCorrect={false}
          returnKeyType={'next'}
        />
        <TextInput
          placeholder={'Password'}
          ref={(input) => (this.passwordInput = input)}
          style={styles['input']}
          value={values.password}
          onChangeText={(text) =>
            setState((prevState) => ({ ...prevState, password: text }))
          }
          secureTextEntry
        />
      </View>
      <View style={styles['buttonContainer']}>
        <Button
          title={'Go next'}
          buttonStyle={styles['button']}
          onPress={next}
        />
      </View>
    </>
  );
};
