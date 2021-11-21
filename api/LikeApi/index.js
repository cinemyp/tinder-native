import { auth, firestore, firebase } from '../../firebase';

const likeUser = (userToLikeId) => {
  const { uid } = auth.currentUser;

  const likesRef = firestore
    .collection('likes')
    .doc(uid)
    .collection('userLikes');

  likesRef
    .doc(userToLikeId)
    .get()
    .then((snapshot) => {
      if (snapshot.exists === false) {
        likesRef
          .doc(userToLikeId)
          .set({ liked: Date.now() })
          .then(() => {});
      } else {
        console.log('Already Liked');
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export default { likeUser };
