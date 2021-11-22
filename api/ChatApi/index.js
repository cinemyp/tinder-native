import { auth, firestore, firebase } from '../../firebase';
import UserApi from '../UserApi';

const createNewDialogs = async (uid, userToDialogId) => {
  try {
    const user = await UserApi.getUserById(uid);
    const userToDialog = await UserApi.getUserById(userToDialogId);

    const userData = getUserToDialog(user);
    const userToDialogData = getUserToDialog(userToDialog);

    await createNewDialog(uid, userToDialogData);
    await createNewDialog(userToDialogId, userData);
  } catch (error) {
    console.log('Error: create new dialogs ' + error);
  }
};

const createNewDialog = async (uid, userToDialog) => {
  return firestore
    .collection('dialogs')
    .doc(uid)
    .collection('userDialogs')
    .add(dialog(userToDialog));
};

const dialog = (user) => {
  return { participant: { ...user } };
};

const getUserToDialog = (doc) => {
  const data = doc.data();
  return { _id: doc.id, name: data.name, avatarId: data.avatarId };
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
      createdAt: Date.now(),
      participant: {
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
    .set({ latestMessage: { text, createdAt: Date.now() } }, { merge: true });
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
          createdAt: Date.now(),
          ...firebaseData,
        };
        if (!firebaseData.system) {
          data.participant = {
            ...firebaseData.user,
          };
        }
        return data;
      });
      setMessages(messages);
    });
};

export default { createNewDialogs, sendMessage, messagesHandler };
