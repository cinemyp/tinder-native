import { auth, firestore, firebase } from '../../firebase';
import { limitText } from '../../utils';
import BaseApi from '../BaseApi';
import ImagesApi from '../ImagesApi';
import UserApi from '../UserApi';

class ChatApi extends BaseApi {
  async createNewDialog(userId, userToDialogId) {
    try {
      await this.post('/api/dialogs', { toId: userId, fromId: userToDialogId });
    } catch (err) {
      console.error(err);
    }
  }

  async getMessages(dialogId) {
    try {
      const res = await this.get('/api/msg/' + dialogId);
      return res.data;
    } catch (err) {
      console.error(err);
    }
  }

  async sendMessage(dialogId, fromId, content) {
    try {
      const res = await this.post('/api/msg/' + dialogId, { fromId, content });
    } catch (err) {
      console.error(err);
    }
  }
}

const api = new ChatApi();
export default api;
