import { auth, firestore, firebase } from '../../firebase';

const createNewDialog = (user) => {
  const { uid } = auth.currentUser;
  firestore.collection('dialogs').doc(uid).collection('userDialogs').add(user);
};

const sendMessage = (text, dialog, currentUser) => {
  const { uid } = auth.currentUser;
  firestore
    .collection('dialogs')
    .doc(uid)
    .collection('userDialogs')
    .doc(dialog._id)
    .collection('messages')
    .add({
      text,
      createdAt: new Date().getTime(),
      user: {
        _id: currentUser.id,
        name: currentUser.name,
        avatarId: currentUser.avatarId,
      },
    });

  firestore
    .collection('dialogs')
    .doc(uid)
    .collection('userDialogs')
    .doc(dialog._id)
    .set(
      { latestMessage: { text, createdAt: new Date().getTime() } },
      { merge: true }
    );
};

const messagesHandler = (dialog, setMessages) => {
  const { currentUser } = auth;
  const { uid } = currentUser;
  return firestore
    .collection('dialogs')
    .doc(uid)
    .collection('userDialogs')
    .doc(dialog._id)
    .collection('messages')
    .orderBy('createdAt', 'desc')
    .onSnapshot((querySnapshot) => {
      const messages = querySnapshot.docs.map((doc) => {
        const firebaseData = doc.data();
        const data = {
          _id: doc.id,
          text: '',
          createdAt: new Date().getTime(),
          ...firebaseData,
        };
        if (!firebaseData.system) {
          data.user = {
            ...firebaseData.user,
          };
        }
        return data;
      });
      setMessages(messages);
    });
};

export default { createNewDialog, sendMessage, messagesHandler };
