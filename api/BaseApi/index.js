import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

class BaseApi {
  constructor() {
    // this.serverUrl =
    //   process.env.NODE_ENV === 'dev'
    //     ? 'http://192.168.0.17:8000'
    //     : 'https://192.168.0.17:8443';
    this.serverUrl = 'http://192.168.0.17:8000';
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
