import { Platform } from 'react-native';

export const isIosPlatform = () => {
  return Platform.OS === 'ios';
};

export const SERVER_URL_DEV = 'http://192.168.0.15:8000';
export const SERVER_URL_PROD = 'http://192.168.0.15:8000';

export const SERVER_URL =
  process.env.NODE_ENV === 'development' ? SERVER_URL_DEV : SERVER_URL_PROD;
