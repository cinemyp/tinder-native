import ImagesApi from '../api/ImagesApi';
import AuthApi from '../api/AuthApi';
import { auth, firestore, firebase } from '../firebase';
import { getUserAge } from '../utils/date';

export const user = (store) => {
  store.on('@init', () => ({ currentUser: {} }));
  store.on('user/save', ({ currentUser }, user) => ({
    currentUser: { ...user },
  }));
  store.on('user/get', async ({ currentUser }) => {
    if (currentUser.name) {
      return;
    }
    const { data } = await AuthApi.getMe();
    store.dispatch('user/save', {
      ...data,
      age: getUserAge(data.birthdayDate),
    });
    // firestore
    //   .collection('users')
    //   .doc(auth.currentUser.uid)
    //   .get()
    //   .then((snapshot) => {
    //     if (snapshot.exists) {
    //       const data = snapshot.data();
    //       const result = { id: auth.currentUser.uid, ...data };
    //       store.dispatch('user/save', { ...result });
    //       return result;
    //     } else {
    //       console.log("doesn't exist");
    //       store.dispatch('user/save', { ...currentUser, status: false });
    //     }
    //   })
    //   .then(async (data) => {
    //     const newData = await ImagesApi.getAvatarImage(
    //       data.id,
    //       data.thumbnailId
    //     ).then((snapshot) => {
    //       if (snapshot.exists) {
    //         const { downloadURL } = snapshot.data();
    //         const newData = { ...data, thumbnailUrl: downloadURL };
    //         store.dispatch('user/save', data);
    //         return newData;
    //       } else {
    //         console.log(
    //           'Thumb Image has not been found. ID is ',
    //           data.thumbnailId
    //         );
    //         store.dispatch('user/save', { ...data, status: false });
    //         return data;
    //       }
    //     });
    //     return newData;
    //   })
    //   .then((data) => {
    //     ImagesApi.getAvatarImage(data.id, data.avatarId).then((snapshot) => {
    //       if (snapshot.exists) {
    //         const { downloadURL } = snapshot.data();
    //         store.dispatch('user/save', {
    //           ...data,
    //           avatarUrl: downloadURL,
    //         });
    //       } else {
    //         console.log(
    //           'Avatar Image has not been found. ID is ',
    //           data.avatarId
    //         );
    //         store.dispatch('user/save', { ...data, status: false });
    //       }
    //     });
    //   })
    //   .catch((error) => {
    //     console.log('Error in store: ' + error);
    //   });
  });
};
