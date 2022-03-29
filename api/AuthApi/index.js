import { makeRedirectUri, ResponseType } from 'expo-auth-session';
import { Alert } from 'react-native';
import { auth, firestore, firebase } from '../../firebase';
import ImagesApi from '../ImagesApi';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

const signIn = async (callback, dispatch) => {
  const res = await axios
    .get('http://192.168.0.17:8000/auth')
    .then((res) => callback(res.data))
    .then((state) => {
      const code = state.url.match(/code=(.*)/)[1];
      return axios('http://192.168.0.17:8000/auth/callback', {
        params: {
          code: code,
        },
      });
    });
  try {
    await SecureStore.setItemAsync('token', JSON.stringify(res.data));
    dispatch('auth/update', { isSignedIn: true });
  } catch (err) {
    dispatch('auth/update', { isSignedIn: false });
  }
};

const signOut = () => {
  dispatch('auth/update', { isSignedIn: false });

  // auth
  //   .signOut()
  //   .then(() => {})
  //   .catch((error) => Alert.alert(error.message));
};
const signOn = (
  { email, password, name, date, imageUri, thumbnailUri, genderId },
  dispatch,
  setProgressLoading
) => {
  // dispatch('auth/update', { registration: true });
  // auth
  //   .createUserWithEmailAndPassword(email, password)
  //   .then((userCredentials) => {
  //     const { uid } = auth.currentUser;
  //     firestore
  //       .collection('users')
  //       .doc(uid)
  //       .set({ name, email, birthdayDate: date, genderId });
  //     return uid;
  //   })
  //   .then((uid) =>
  //     ImagesApi.uploadAvatarImage(
  //       uid,
  //       imageUri,
  //       thumbnailUri,
  //       setProgressLoading
  //     )
  //   )
  //   .then((snapshot) => {
  //     saveProfileData(dispatch);
  //     dispatch('auth/update', { registration: false });
  //   });
};
const saveProfileData = (dispatch) => {
  dispatch('user/get');
};

export default {
  signIn,
  signOut,
  signOn,
};
