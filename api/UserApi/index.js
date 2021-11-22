import { Alert } from 'react-native';
import { auth, firestore, firebase } from '../../firebase';

const getUserById = async (uid) => {
  return firestore.collection('users').doc(uid).get();
};

export default { getUserById };
