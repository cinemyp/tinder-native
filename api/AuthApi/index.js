import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { Alert } from 'react-native';

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
    await SecureStore.setItemAsync('token', res.data.access_token);
    dispatch('auth/update', { isSignedIn: true });
  } catch (err) {
    dispatch('auth/update', { isSignedIn: false });
  }
};

const signOut = async (dispatch) => {
  try {
    await SecureStore.setItemAsync('token', '');
    dispatch('auth/update', { isSignedIn: false });
  } catch (err) {
    console.log(err);
  }
};

const getMe = async () => {
  const token = await SecureStore.getItemAsync('token');
  const res = await axios
    .get('http://192.168.0.17:8000/auth/me', {
      headers: {
        Authorization: 'Oauth ' + token,
      },
    })
    .then((me) => {
      return me;
    })
    .catch((err) => {
      Alert.alert('Error', 'Some error');
    });
  return res.data;
};

export default {
  signIn,
  signOut,
  getMe,
};
