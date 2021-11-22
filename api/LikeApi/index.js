import { Alert } from 'react-native';
import { auth, firestore, firebase } from '../../firebase';
import ChatApi from '../ChatApi';

/**
 * Метод лайка пользователя
 * @param {*} userToLikeId Айди профиля
 */
const likeUser = async (userToLikeId) => {
  const { uid } = auth.currentUser;

  const likesRef = firestore
    .collection('likes')
    .doc(uid)
    .collection('userLikes');

  try {
    const hasLike = await hasLiked(userToLikeId, uid, likesRef);
    if (hasLike === false) {
      await likesRef.doc(userToLikeId).set({ liked: Date.now() });
    } else {
      console.log('Already Liked');
    }
    const match = await hasLiked(uid, userToLikeId);
    if (match) {
      Alert.alert('You have a new match!');
      ChatApi.createNewDialogs(uid, userToLikeId);
    }
  } catch (err) {
    console.log(err);
  }
};
/**
 * Проверяет, лайкнул ли авторизированный пользователь данный профиль
 * @param {*} userToLikeId Айди профиля
 * @param {*} uid Айди пользователя
 * @param {*} likesRef Ссылка на коллекцию
 * @returns
 */
const hasLiked = async (userToLikeId, uid, likesRef = null) => {
  if (likesRef === null) {
    likesRef = firestore.collection('likes').doc(uid).collection('userLikes');
  }
  return likesRef
    .doc(userToLikeId)
    .get()
    .then((snapshot) => {
      return snapshot.exists;
    });
};

export default { likeUser, hasLiked };
