import ImagesApi from '../api/ImagesApi';
import { auth, firestore, firebase } from '../firebase';

export const user = (store) => {
  store.on('@init', () => ({ currentUser: {} }));
  store.on('user/save', ({ currentUser }, user) => ({
    currentUser: { ...user },
  }));
  store.on('user/get', ({ currentUser }) => {
    firestore
      .collection('users')
      .doc(auth.currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          const data = snapshot.data();
          const result = { id: auth.currentUser.uid, ...data };
          store.dispatch('user/save', { ...result });
          return result;
        } else {
          console.log("doesn't exist");
          store.dispatch('user/save', { ...currentUser, status: false });
        }
      })
      .then(async (data) => {
        const newData = await ImagesApi.getAvatarImage(
          data.id,
          data.avatarId
        ).then((snapshot) => {
          if (snapshot.exists) {
            const { downloadURL } = snapshot.data();
            const newData = { ...data, avatarUrl: downloadURL };
            store.dispatch('user/save', data);
            return newData;
          } else {
            console.log('Image has not been found. ID is ', data.avatarId);
            store.dispatch('user/save', { ...data, status: false });
          }
        });
        return newData;
      })
      .then((data) => {
        ImagesApi.getAvatarImage(data.id, data.thumbnailId).then((snapshot) => {
          if (snapshot.exists) {
            const { downloadURL } = snapshot.data();

            store.dispatch('user/save', {
              ...data,
              thumbnailUrl: downloadURL,
            });
          } else {
            console.log('Image has not been found. ID is ', data.thumbnailId);
            store.dispatch('user/save', { ...data, status: false });
          }
        });
      })
      .catch((error) => {
        console.log('Error in store: ' + error);
      });
  });
};
