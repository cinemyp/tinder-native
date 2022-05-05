import { Alert } from 'react-native';
import BaseApi from '../BaseApi';

class MusicApi extends BaseApi {
  async getTopArtists(uid) {
    try {
      console.log(uid);
      const res = await this.get('/api/music/getTopArtists/' + uid);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
}

const api = new MusicApi();
export default api;
