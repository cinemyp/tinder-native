import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { Alert } from 'react-native';
import BaseApi from '../BaseApi';

class AuthApi extends BaseApi {
  async signIn(callback, dispatch) {
    try {
      const res = await this.get('/auth')
        .then((res) => callback(res.data))
        .then((state) => {
          if (!state.url) {
            return;
          }
          const code = state.url.match(/code=(.*)/)[1];
          return this.get('/auth/callback', {
            params: {
              code: code,
            },
          });
        });
      if (!res) {
        return;
      }
      await this.setToken(res.data.access_token);
      dispatch('auth/update', { isSignedIn: true });
    } catch (err) {
      console.log(err);
      dispatch('auth/update', { isSignedIn: false });
    }
  }

  async signOut(dispatch) {
    try {
      await SecureStore.setItemAsync('token', '');
      dispatch('auth/update', { isSignedIn: false });
    } catch (err) {
      console.log(err);
    }
  }

  async getMe() {
    const res = await this.get('/auth/me')
      .then((me) => {
        return me;
      })
      .catch((err) => {
        Alert.alert('Error', 'Some error');
      });
    return res.data;
  }
}
const api = new AuthApi();
export default api;
