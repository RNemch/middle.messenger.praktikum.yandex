import ChatsApi from '../api/chats';
import { httpErrorHandling } from '../utils/helper-controller';
import store from '../utils/store';

class ChatsController {
  private api: ChatsApi;

  constructor() {
    this.api = new ChatsApi();
  }

  async addChat(data: { title: string }) {
    const response = await this.api.addChat(data);

    try {
      httpErrorHandling(response);

      await this.chats();
    } catch (e) {
      alert(e);
    }
  }

  async chats() {
    const response = await this.api.chats();

    try {
      httpErrorHandling(response);

      store.set('chats', response.response);
    } catch (e) {
      alert(e);
    }
  }

  async deleteChat(data: { chatId: number }) {
    const response = await this.api.deleteChat(data);

    try {
      httpErrorHandling(response);

      await this.chats();
    } catch (e) {
      alert(e);
    }
  }

  async addUser(data: { users: number[]; chatId: number }) {
    const response = await this.api.addUser(data);

    try {
      httpErrorHandling(response);
    } catch (e) {
      alert(e);
    }
  }

  async getUsers(data: { id: number }) {
    const response = await this.api.getUsers(data);

    try {
      httpErrorHandling(response);

      return response.response;
    } catch (e) {
      alert(e);
    }
  }

  async delUser(data: { users: number[]; chatId: number }) {
    const response = await this.api.delUser(data);

    try {
      httpErrorHandling(response);
    } catch (e) {
      alert(e);
    }
  }

  async getToken(id: number) {
    return this.api.getToken(id);
  }
}

export default new ChatsController();
