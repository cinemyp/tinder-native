import { auth, firestore, firebase } from '../../firebase';
import ImagesApi from '../ImagesApi';
import UserApi from '../UserApi';

const createNewDialogs = async (uid, userToDialogId) => {
  try {
    const user = await UserApi.getUserById(uid);
    const userToDialog = await UserApi.getUserById(userToDialogId);

    const userData = getUserToDialog(user);
    const userToDialogData = getUserToDialog(userToDialog);

    const dialog = await createNewDialog(uid, userToDialogData);
    await createNewDialog(userToDialogId, userData, dialog.id);
  } catch (error) {
    console.log('Error: create new dialogs ' + error);
  }
};

const createNewDialog = async (uid, userToDialog, dialogId = null) => {
  if (dialogId) {
    return firestore
      .collection('dialogs')
      .doc(uid)
      .collection('userDialogs')
      .doc(dialogId)
      .set(dialog(userToDialog));
  }
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
  return { _id: doc._id, name: doc.name, thumbnailId: doc.thumbnailId };
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
        thumbnailId: currentUser.thumbnailId,
      },
    });

  firestore
    .collection('dialogs')
    .doc(dialog.participant._id)
    .collection('userDialogs')
    .doc(dialog._id)
    .collection('messages')
    .add({
      text,
      createdAt: Date.now(),
      participant: {
        _id: currentUser.id,
        name: currentUser.name,
        thumbnailId: currentUser.thumbnailId,
      },
    });

  firestore
    .collection('dialogs')
    .doc(uid)
    .collection('userDialogs')
    .doc(dialog._id)
    .set({ latestMessage: { text, createdAt: Date.now() } }, { merge: true });
  firestore
    .collection('dialogs')
    .doc(dialog.participant._id)
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
          data.user = {
            ...firebaseData.participant,
            avatar: dialog.participant.thumbnailUrl,
          };
        }
        return data;
      });
      setMessages(messages);
    });
};

const dialogListener = (setDialogs, loading, setLoading) => {
  const { currentUser } = auth;
  const { uid } = currentUser;
  return firestore
    .collection('dialogs')
    .doc(uid)
    .collection('userDialogs')
    .onSnapshot(async (querySnapshot) => {
      const dialogs = querySnapshot.docs.map((documentSnapshot) => ({
        _id: documentSnapshot.id,
        ...documentSnapshot.data(),
      }));
      setDialogs(dialogs);

      const result = await Promise.all(
        dialogs.map(async (item) => {
          const avatar = await ImagesApi.getAvatarImage(
            item.participant._id,
            item.participant.thumbnailId
          );
          const { downloadURL } = avatar.data();
          return {
            ...item,
            participant: { ...item.participant, thumbnailUrl: downloadURL },
          };
        })
      );
      setDialogs(result);

      if (loading) {
        setLoading(false);
      }
    });
};

export default {
  createNewDialogs,
  sendMessage,
  messagesHandler,
  dialogListener,
};
