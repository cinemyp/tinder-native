import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, Text } from 'react-native-elements';
import { RegistrationStepOne } from '../components/Registration/RegistrationStepOne';
import { RegistrationStepTwo } from '../components/Registration/RegistrationStepTwo';
import { auth, firestore, firebase } from '../firebase';

const defaultState = {
  email: '',
  password: '',
  name: '',
  imageUri: '',
};

export const RegisterScreen = () => {
  const [state, setState] = useState(defaultState);
  const [step, setStep] = useState(0);

  const maxSteps = 2;

  const nextStep = () => {
    switch (step) {
      case 0:
        if (!state.email || !state.password || !state.name) {
          //TODO: вернуть ошибку, напистаь, что нужно заполнить все поля
          //TODO: проверка полей
          return;
        }
        break;
      case 1:
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

  const steps = [
    {
      component: (
        <RegistrationStepOne
          setState={setState}
          next={nextStep}
          values={state}
          styles={styles}
        />
      ),
    },
    {
      component: (
        <RegistrationStepTwo
          setState={setState}
          next={nextStep}
          values={state}
          styles={styles}
        />
      ),
    },
  ];

  const handlePressRegister = () => {
    const { email, password, name } = state;

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const { uid } = auth.currentUser;
        firestore.collection('users').doc(uid).set({ name, email });
      })
      .then(() => fetch(state.imageUri))
      .then((response) => response.blob())
      .then((blob) => {
        const childPath = `images/${
          auth.currentUser.uid
        }/${Math.random().toString(36)}`;

        const task = firebase.storage().ref().child(childPath).put(blob);

        const taskProgress = (snapshot) => {
          console.log(`transferred: ${snapshot.bytesTransferred}`);
          //TODO: прогресс бар
        };

        const taskCompleted = () => {
          task.snapshot.ref.getDownloadURL().then((snapshot) => {
            saveProfileData(snapshot);
            console.log(snapshot);
          });
        };

        const taskError = (snapshot) => {
          console.log(snapshot);
        };

        task.on('state_changed', taskProgress, taskError, taskCompleted);
      })
      .catch((error) => {
        alert(error.message);
        console.log(error.message);
      });
  };

  const saveProfileData = (data) => {
    const { uid } = auth.currentUser;
    //TODO: заменить на апи метод
    firestore
      .collection('images')
      .doc(uid)
      .collection('userImages')
      .add({
        downloadURL: data,
        uploaded: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((docRef) => {
        firestore.collection('users').doc(uid).update({ avatarId: docRef.id });
      });
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
});
