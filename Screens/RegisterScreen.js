import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { useStoreon } from 'storeon/react';
import AuthApi from '../api/AuthApi';
import { PRIMARY_COLOR } from '../constants/colors';
import { getUserAge } from '../utils/date';

const defaultState = {
  email: '',
  password: '',
  name: '',
  imageUri: '',
  thumbnailUri: '',
  genderId: '',
  date: new Date(),
};

const INITIAL_STEP = 0;
const MAX_STEPS = 3;

export const RegisterScreen = () => {
  const [state, setState] = useState(defaultState);
  const [step, setStep] = useState(INITIAL_STEP);
  const [progressLoading, setProgressLoading] = useState(0);
  const { dispatch } = useStoreon('authState');

  const nextStep = () => {
    switch (step) {
      case 0:
        if (!state.email || !state.password || !state.name) {
          //TODO: проверка полей
          Alert.alert('Error during registration', 'Fill in all the fields');
          return;
        }
        break;
      case 1:
        const yearsOld = getUserAge(state.date.getTime() / 1000);
        if (yearsOld < 18) {
          Alert.alert(
            'Error during registration',
            'You are under the age of 18'
          );

          return;
        }
        break;
      case 2:
        break;
      case 3:
        if (!state.imageUri) {
          return;
        }
        handlePressRegister();
        return;
      default:
        return;
    }

    setStep((prevStep) => prevStep + 1);
  };

  const steps = [];

  const handlePressRegister = () => {
    AuthApi.signOn(state, dispatch, setProgressLoading);
  };

  return (
    <KeyboardAvoidingView style={styles['container']} behavior={'padding'}>
      {steps[step].component}
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
  dateContainer: {
    width: '100%',
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
  thumbnail: {
    width: 250,
    height: 350,
    resizeMode: 'cover',
    borderRadius: 5,
    zIndex: 0,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 252,
    height: 352,
    backgroundColor: '#ccc',
    borderColor: '#aaa',
    borderWidth: 2,
    borderRadius: 5,
    position: 'relative',
  },
  removeBtn: {
    position: 'absolute',
    zIndex: 99,
    right: -20,
    top: -20,
  },
  addPhotoBtn: {
    position: 'absolute',
    zIndex: 99,
  },
  gender_btnContainer: {
    justifyContent: 'center',
    marginBottom: 50,
  },
  gender_button: {
    marginTop: 50,
    width: 150,
    backgroundColor: PRIMARY_COLOR,
    borderWidth: 1,
    borderColor: 'black',
  },
  gender_button__nonselected: {
    marginTop: 50,
    width: 150,
    backgroundColor: PRIMARY_COLOR + '95',
    borderWidth: 0,
  },
});
