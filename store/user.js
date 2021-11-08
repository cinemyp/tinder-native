import { auth, firestore } from '../firebase';

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
          store.dispatch('user/save', { ...data });
          console.log('store', data);
        } else {
          console.log("doesn't exist");
          store.dispatch('user/save', { ...currentUser, status: false });
        }
      });
  });
};
