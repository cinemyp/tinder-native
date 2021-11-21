import { auth, firestore, firebase } from '../../firebase';

const likeUser = (userToLikeId) => {
  const { uid } = auth.currentUser;

  const likesRef = firestore
    .collection('likes')
    .doc(uid)
    .collection('userLikes');

  hasLiked(userToLikeId, likesRef).then((exists) => {
    if (exists === false) {
      likesRef
        .doc(userToLikeId)
        .set({ liked: Date.now() })
        .then(() => {});
    } else {
      console.log('Already Liked');
    }
  });
};

const hasLiked = async (userToLikeId, likesRef = null) => {
  const { uid } = auth.currentUser;

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
