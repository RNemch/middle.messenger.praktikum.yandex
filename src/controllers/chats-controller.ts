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

    httpErrorHandling(response);

    await this.chats();
  }
  async chats() {
    const response = await this.api.chats();

    httpErrorHandling(response);

    store.set('chats', response.response);
  }

  async deleteChat(data: { chatId: number }) {
    const response = await this.api.deleteChat(data);

    httpErrorHandling(response);

    await this.chats();
  }

  async addUser(data: { users: number[]; chatId: number }) {
    const response = await this.api.addUser(data);

    httpErrorHandling(response);
  }

  async getUsers(data: { id: number }) {
    const response = await this.api.getUsers(data);

    httpErrorHandling(response);

    return response.response;
  }

  async delUser(data: { users: number[]; chatId: number }) {
    const response = await this.api.delUser(data);

    httpErrorHandling(response);
  }
}

export default new ChatsController();
