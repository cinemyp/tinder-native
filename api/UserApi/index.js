import { Alert } from 'react-native';
import { auth, firestore, firebase } from '../../firebase';
import ImagesApi from '../ImagesApi';

const getUserById = async (uid) => {
  try {
    const data = await firestore.collection('users').doc(uid).get();
    const userData = user(data);

    const avatar = await ImagesApi.getAvatarImage(uid, userData.avatarId);
    userData.avatarUrl = avatar.data().downloadURL;
    return userData;
  } catch (error) {
    console.log('Error: getUserById ' + uid);
  }
};

const user = (doc) => {
  return { _id: doc.id, ...doc.data() };
};

export default { getUserById };
