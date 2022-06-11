import { Alert } from 'react-native';
import BaseApi from '../BaseApi';

class MusicApi extends BaseApi {
  async init(uid) {
    try {
      const res = await this.get('/api/music/' + uid);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
  async getTopArtists(uid) {
    try {
      const res = await this.get('/api/music/getTopArtists/' + uid);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
  async compareTastes(uidFrom, uidTo) {
    try {
      const res = await this.get(
        `/api/music/compareTastes/${uidFrom}:${uidTo}`
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
}

const api = new MusicApi();
export default api;
