import { Alert } from 'react-native';
import { auth, firestore, firebase } from '../../firebase';
import LikeApi from '../LikeApi';

const getProfiles = async (currentUser) => {
  let users = await firestore
    .collection('users')
    .get()
    .then(async (snapshot) => {
      let snaps = [];
      let users = [];
      snapshot.forEach((item) => snaps.push(item));
      await Promise.all(
        snaps.map(async (doc) => {
          const newUser = getUser(doc);
          //Если это мы, то пропускаем
          if (newUser._id === auth.currentUser.uid) {
            return;
          }

          if (newUser.genderId === currentUser.genderId) {
            return;
          }
          const isLiked = await LikeApi.hasLiked(newUser._id);
          //Если мы лайкнули пользователя, то пропускаем
          if (!isLiked) {
            users.push(newUser);
          }
        })
      );
      return users;
    })
    .catch((error) => {
      console.log(error.message);
    });
  //здесь получаем аватарки для всех пользователей
  users = await Promise.all(
    users.map(async (item) => {
      try {
        console.log(item);
        const snapshot = await getAvatarImage(item._id, item.avatarId);
        if (snapshot.exists) {
          const { downloadURL } = snapshot.data();
          return { ...item, avatarUrl: downloadURL };
        } else {
          console.log('Image has not been found. ID is ', item.avatarId);
        }
      } catch (error) {
        console.log(error.message);
      }
    })
  );
  return users;
};

const getUser = (doc) => ({ _id: doc.id, ...doc.data() });

const getAvatarImage = async (userId, avatarId) => {
  return firestore
    .collection('images')
    .doc(userId)
    .collection('userImages')
    .doc(avatarId)
    .get();
};

export default { getProfiles };
