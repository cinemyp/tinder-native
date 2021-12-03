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
          keyboardType={'email-address'}
          autoCompleteType={'email'}
          autoCapitalize={'none'}
          autoCorrect={false}
          returnKeyType={'next'}
          textContentType={'emailAddress'}
        />
        <TextInput
          placeholder={'Name'}
          style={styles['input']}
          value={values.name}
          onChangeText={(text) =>
            setState((prevState) => ({ ...prevState, name: text }))
          }
          autoCorrect={false}
          returnKeyType={'next'}
          textContentType={'username'}
        />
        <TextInput
          placeholder={'Password'}
          style={styles['input']}
          value={values.password}
          onChangeText={(text) =>
            setState((prevState) => ({ ...prevState, password: text }))
          }
          secureTextEntry
          textContentType={'password'}
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
