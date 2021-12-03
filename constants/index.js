import { Platform } from 'react-native';

export const isIosPlatform = () => {
  return Platform.OS === 'ios';
};
