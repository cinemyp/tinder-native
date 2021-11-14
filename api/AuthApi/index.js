import { Alert } from 'react-native';
import { auth, firestore, firebase } from '../../firebase';

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
const signOn = ({ email, password, name, date, imageUri }, dispatch) => {
  dispatch('auth/update', { registration: true });
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredentials) => {
      const { uid } = auth.currentUser;
      firestore
        .collection('users')
        .doc(uid)
        .set({ name, email, birthdayDate: date });
    })
    .then(() => fetch(imageUri))
    .then((response) => response.blob())
    .then((blob) => {
      const childPath = `images/${
        auth.currentUser.uid
      }/${Math.random().toString(36)}`;

      const task = firebase.storage().ref().child(childPath).put(blob);

      const taskProgress = (snapshot) => {
        console.log(`transferred: ${snapshot.bytesTransferred}`);
        //TODO: прогресс бар
      };

      const taskCompleted = () => {
        task.snapshot.ref.getDownloadURL().then((snapshot) => {
          saveProfileData(snapshot, dispatch);
          console.log(snapshot);
        });
      };

      const taskError = (snapshot) => {
        console.log(snapshot);
      };

      task.on('state_changed', taskProgress, taskError, taskCompleted);
    })
    .catch((error) => {
      Alert.alert(error.message);
      console.log(error.message);
    });
};
const saveProfileData = (data, dispatch) => {
  const { uid } = auth.currentUser;

  firestore
    .collection('images')
    .doc(uid)
    .collection('userImages')
    .add({
      downloadURL: data,
      uploaded: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then((docRef) => {
      firestore.collection('users').doc(uid).update({ avatarId: docRef.id });
      dispatch('user/get');
      dispatch('auth/update', { registration: false });
    });
};

export default { signIn, signOut, signOn };
