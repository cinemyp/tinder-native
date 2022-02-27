import { makeRedirectUri, ResponseType } from 'expo-auth-session';
import { Alert } from 'react-native';
import { auth, firestore, firebase } from '../../firebase';
import ImagesApi from '../ImagesApi';

const spotifyAuthConfig = {
  clientId: '52b5817b6c974c8d8d442f70b77f4c9e',
  clientSecret: '6bed9bf16d0d4ee68ba111f41790de8f',
  responseType: ResponseType.Token,
  redirectUri: makeRedirectUri({
    scheme: 'com.tinify://oauth/',
  }),
  usePKCE: false,
  scopes: [
    'playlist-read-private',
    'playlist-modify-public',
    'playlist-modify-private',
    'user-library-read',
    'user-library-modify',
    'user-top-read',
  ],
};
const serviceConfiguration = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

const signIn = (email, password, dispatch) => {
  auth
    .signInWithEmailAndPassword(email, password)
    .then((userCredentials) => {
      const user = userCredentials.user;
      //запрашиваем данные о пользователе и сохраняем в сторе
      dispatch('user/get');
    })
    .catch((error) => {
      //TODO: заменить на константу
      let alertMessage = '';
      if (!email || !password) alertMessage = 'Fill in all the fields';
      else alertMessage = error.message;
      //TODO: заменить на константу
      Alert.alert('Error during log in', alertMessage);
    });
};
const signOut = () => {
  auth
    .signOut()
    .then(() => {})
    .catch((error) => Alert.alert(error.message));
};
const signOn = (
  { email, password, name, date, imageUri, thumbnailUri, genderId },
  dispatch,
  setProgressLoading
) => {
  dispatch('auth/update', { registration: true });
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredentials) => {
      const { uid } = auth.currentUser;
      firestore
        .collection('users')
        .doc(uid)
        .set({ name, email, birthdayDate: date, genderId });
      return uid;
    })
    .then((uid) =>
      ImagesApi.uploadAvatarImage(
        uid,
        imageUri,
        thumbnailUri,
        setProgressLoading
      )
    )
    .then((snapshot) => {
      saveProfileData(dispatch);
      dispatch('auth/update', { registration: false });
    });
};
const saveProfileData = (dispatch) => {
  dispatch('user/get');
};

export default {
  signIn,
  signOut,
  signOn,
  spotifyAuthConfig,
  serviceConfiguration,
};
