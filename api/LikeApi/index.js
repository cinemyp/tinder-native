import { Alert } from 'react-native';
import BaseApi from '../BaseApi';

class LikeApi extends BaseApi {
  async likeUser(userId, likedUserId) {
    try {
      const res = await this.post('/api/like', { userId, likedUserId });
      console.log(res.data.match);
      if (res.data.match) {
        Alert.alert('New Match!', 'You have a new match! Start a dialog', [
          { text: 'OK' },
        ]);
      }
    } catch (err) {
      console.log(err);
    }
  }
}

const api = new LikeApi();
export default api;
