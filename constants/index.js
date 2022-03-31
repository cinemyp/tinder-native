import { Platform } from 'react-native';

export const isIosPlatform = () => {
  return Platform.OS === 'ios';
};

export const SERVER_URL_DEV = 'http://192.168.0.17:8000';
export const SERVER_URL_PROD = 'https://192.168.0.17:8443';

export const SERVER_URL =
  process.env.NODE_ENV === 'development' ? SERVER_URL_DEV : SERVER_URL_PROD;
