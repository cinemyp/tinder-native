import BaseApi from '../BaseApi';

class LikeApi extends BaseApi {
  async likeUser(userId, likedUserId) {
    try {
      const res = await this.post('/api/like', { userId, likedUserId });
      console.log(res.data.match);
    } catch (err) {
      console.log(err);
    }
  }
}

const api = new LikeApi();
export default api;
