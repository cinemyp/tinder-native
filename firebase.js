// Import the functions you need from the SDKs you need
import * as firebase from 'firebase';
import '@firebase/app';
import '@firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCn1keemJ_VPrR0kOmjV6C_k8SEEY2xCC0',
  authDomain: 'tinder-native-5420b.firebaseapp.com',
  projectId: 'tinder-native-5420b',
  storageBucket: 'tinder-native-5420b.appspot.com',
  messagingSenderId: '990435223338',
  appId: '1:990435223338:web:4079d32f96d0850b59e053',
};

// Initialize Firebase
let app;
if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.getApp();
}

const auth = getAuth();

export { auth };
