import axios from 'axios';
import { Alert } from 'react-native';
import { firestore, firebase } from '../../firebase';
import BaseApi from '../BaseApi';

const createFormData = (photo, userId, body) => {
  const data = new FormData();
  const fileName = photo.split('/').pop();
  data.append('file', {
    name: fileName,
    type: 'image/png',
    uri: Platform.OS === 'android' ? photo : photo.replace('file://', ''),
  });

  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });

  return data;
};

class ImageApi extends BaseApi {
  async updateImage(imageUri, userId) {
    try {
      await fetch(this.serverUrl + '/photo/upload/' + userId, {
        body: createFormData(imageUri, userId, {}),
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
}
const api = new ImageApi();
export default api;
