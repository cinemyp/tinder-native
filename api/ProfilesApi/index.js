import { Alert } from 'react-native';
import { auth, firestore, firebase } from '../../firebase';

const getProfiles = async (currentUser) => {
  let users = await firestore
    .collection('users')
    .get()
    .then((snapshot) => {
      let users = [];
      snapshot.forEach((doc) => {
        const newUser = getUser(doc);

        // if (newUser.genderId !== currentUser.genderId) {
        users.push(getUser(doc));
        // }
      });

      return users;
    })
    .catch((error) => {
      console.log(error.message);
    });

  users = await Promise.all(
    users.map(async (item) => {
      try {
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
