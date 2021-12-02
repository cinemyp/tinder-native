import { Alert } from 'react-native';
import { firestore, firebase } from '../../firebase';

const getAvatarImage = async (userId, avatarId) => {
  return firestore
    .collection('images')
    .doc(userId)
    .collection('userImages')
    .doc(avatarId)
    .get();
};

const addNewImage = async (uid, data, filename) => {
  return firestore.collection('images').doc(uid).collection('userImages').add({
    downloadURL: data,
    filename: filename,
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
      const nameId = Math.random().toString(36);
      const childPath = `images/${uid}/${nameId}`;
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

      return { url: url, path: childPath, filename: nameId };
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
      const filename = `@thumb_${avatarData.filename}`;
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
      return { url: url, path: childPath, filename: filename };
    })
    .catch((error) => {
      Alert.alert(error.message);
      console.log(error.message);
    });

  const avatarSnap = await addNewImage(
    uid,
    avatarData.url,
    avatarData.filename
  );
  const tSnap = await addNewImage(uid, tData.url, tData.filename);

  return firestore
    .collection('users')
    .doc(uid)
    .update({ avatarId: avatarSnap.id, thumbnailId: tSnap.id });
};

const updateAvatar = async (
  uid,
  avatarId,
  newImageUri,
  thumbnailId,
  newThumbnailUri
) => {
  try {
    const result = await getAvatarImage(uid, avatarId);
    const { filename } = result.data();

    const avatarPath = `images/${uid}/${filename}`;
    const thumbnailPath = `images/${uid}/@thumb_${filename}`;

    //delete image files
    await firebase.storage().ref().child(avatarPath).delete();
    await firebase.storage().ref().child(thumbnailPath).delete();
  } catch (error) {
    console.log(error.message);
  }
  //upload new files

  const avatarData = await fetch(newImageUri)
    .then((response) => response.blob())
    .then(async (blob) => {
      const nameId = Math.random().toString(36);
      const childPath = `images/${uid}/${nameId}`;
      const task = firebase.storage().ref().child(childPath).put(blob);

      const taskProgress = (snapshot) => {
        console.log(`transferred: ${snapshot.bytesTransferred}`);
      };

      const taskError = (snapshot) => {
        console.log('Error while uploading ' + snapshot);
      };

      task.on('state_changed', taskProgress, taskError);

      await task;

      const url = await task.snapshot.ref.getDownloadURL();

      return { url: url, path: childPath, filename: nameId };
    })
    .catch((error) => {
      Alert.alert(error.message);
      console.log(error.message);
    });

  const thumbData = await fetch(newThumbnailUri)
    .then((response) => response.blob())
    .then(async (blob) => {
      console.log('Start');
      const childPath = getThumbnailPath(avatarData.path);
      const filename = `@thumb_${avatarData.filename}`;
      const task = firebase.storage().ref().child(childPath).put(blob);

      const taskProgress = (snapshot) => {
        console.log(`transferred: ${snapshot.bytesTransferred}`);
      };

      const taskError = (snapshot) => {
        console.log('Error while uploading ' + snapshot);
      };

      task.on('state_changed', taskProgress, taskError);
      await task;
      const url = await task.snapshot.ref.getDownloadURL();

      return { url: url, path: childPath, filename: filename };
    })
    .catch((error) => {
      Alert.alert(error.message);
      console.log(error.message);
    });

  //update urls
  try {
    await firestore
      .collection('images')
      .doc(uid)
      .collection('userImages')
      .doc(avatarId)
      .update({
        downloadURL: avatarData.url,
        filename: avatarData.filename,
        uploaded: firebase.firestore.FieldValue.serverTimestamp(),
      });

    await firestore
      .collection('images')
      .doc(uid)
      .collection('userImages')
      .doc(thumbnailId)
      .update({
        downloadURL: thumbData.url,
        filename: thumbData.filename,
        uploaded: firebase.firestore.FieldValue.serverTimestamp(),
      });
  } catch (error) {
    console.log(error.message);
  }
};

const getThumbnailPath = (path) => {
  let str = path.split('/');
  let thumbnailName = str.pop();
  thumbnailName = `@thumb_${thumbnailName}`;
  str.push(thumbnailName);
  return str.join('/');
};

export default { getAvatarImage, addNewImage, uploadAvatarImage, updateAvatar };
