import { Alert } from 'react-native';
import { auth, firestore, firebase } from '../../firebase';

const getAvatarImage = async (userId, avatarId) => {
  return firestore
    .collection('images')
    .doc(userId)
    .collection('userImages')
    .doc(avatarId)
    .get();
};

export default { getAvatarImage };
