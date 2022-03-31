import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { SERVER_URL } from '../../constants';

class BaseApi {
  constructor() {
    this.serverUrl = SERVER_URL;
  }

  async get(endpoint, config = {}) {
    return axios.get(this.serverUrl + endpoint, { ...config });
  }

  async post(endpoint, data, config) {
    return axios.post(this.serverUrl + endpoint, { ...data }, { ...config });
  }

  async getToken() {
    return await SecureStore.getItemAsync('token');
  }

  async setToken(token) {
    await SecureStore.setItemAsync('token', token);
    this.overrideAxios(token);
  }

  overrideAxios(token) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  }
}

export default BaseApi;
