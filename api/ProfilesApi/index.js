import axios from 'axios';
import { Alert } from 'react-native';
import { auth, firestore } from '../../firebase';
import { getUserAge } from '../../utils/date';
import BaseApi from '../BaseApi';
import LikeApi from '../LikeApi';

class ProfilesApi extends BaseApi {
  async getProfiles(userId) {
    try {
      const res = await this.get('/api/profile', {
        params: {
          userId: userId,
        },
      });
      let profiles = [];
      //TODO: сделать сериалайзер или высчитывать на бэке
      for (let p of res.data) {
        profiles.push({ ...p, age: getUserAge(p.birthdayDate) });
      }
      return profiles;
    } catch (err) {
      console.log(err);
    }
  }
}

const api = new ProfilesApi();
export default api;
