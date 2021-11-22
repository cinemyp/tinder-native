import { Alert } from 'react-native';
import { auth, firestore, firebase } from '../../firebase';

const getAvatarImage = async (userId, avatarId) => {
  return firestore
    .collection('images')
    .doc(userId)
    .collection('userImages')
    .doc(avatarId)
    .get();
};

const addNewImage = async (uid, data) => {
  return firestore.collection('images').doc(uid).collection('userImages').add({
    downloadURL: data,
    uploaded: firebase.firestore.FieldValue.serverTimestamp(),
  });
};

const uploadAvatarImage = async (
  uid,
  imageUri,
  thumbnailUri,
  setProgressLoading
) => {
  console.log('Start upload');
  const avatarData = await fetch(imageUri)
    .then((response) => response.blob())
    .then(async (blob) => {
      const childPath = `images/${uid}/${Math.random().toString(36)}`;
      const task = firebase.storage().ref().child(childPath).put(blob);

      const taskProgress = (snapshot) => {
        console.log(`transferred: ${snapshot.bytesTransferred}`);
        setProgressLoading(snapshot.bytesTransferred);
      };

      const taskError = (snapshot) => {
        console.log('Error while uploading ' + snapshot);
      };

      task.on('state_changed', taskProgress, taskError);

      await task;
      const url = await task.snapshot.ref.getDownloadURL();

      return { url: url, path: childPath };
    })
    .catch((error) => {
      Alert.alert(error.message);
      console.log(error.message);
    });

  const tData = await fetch(thumbnailUri)
    .then((response) => response.blob())
    .then(async (blob) => {
      console.log('Start');
      const childPath = getThumbnailPath(avatarData.path);

      const task = firebase.storage().ref().child(childPath).put(blob);

      const taskProgress = (snapshot) => {
        console.log(`transferred: ${snapshot.bytesTransferred}`);
        setProgressLoading(snapshot.bytesTransferred);
        //TODO: прогресс бар
      };

      const taskError = (snapshot) => {
        console.log('Error while uploading ' + snapshot);
      };

      task.on('state_changed', taskProgress, taskError);

      await task;
      const url = await task.snapshot.ref.getDownloadURL();
      return { url: url, path: childPath };
    })
    .catch((error) => {
      Alert.alert(error.message);
      console.log(error.message);
    });

  const avatarSnap = await addNewImage(uid, avatarData.url);
  const tSnap = await addNewImage(uid, tData.url);

  return firestore
    .collection('users')
    .doc(uid)
    .update({ avatarId: avatarSnap.id, thumbnailId: tSnap.id });
};

const getThumbnailPath = (path) => {
  let str = path.split('/');
  let thumbnailName = str.pop();
  thumbnailName = `@thumb_${thumbnailName}`;
  str.push(thumbnailName);
  return str.join('/');
};

export default { getAvatarImage, addNewImage, uploadAvatarImage };
