import ChatsApi from '../api/chats';
import store from '../utils/store';

class ChatsController {
  private api: ChatsApi;

  constructor() {
    this.api = new ChatsApi();
  }

  async addChat(data: { title: string }) {
    await this.api
      .addChat(data)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(response.response.reason);
        }
        this.chats();
      })
      .catch((e) => {
        alert(e);
      });
  }
  async chats() {
    await this.api
      .chats()
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(response.response.reason);
        }
        store.set('chats', response.response);
      })
      .catch((e) => {
        alert(e);
      });
  }

  async deleteChat(data: { chatId: number }) {
    await this.api
      .deleteChat(data)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(response.response.reason);
        }
        this.chats();
      })
      .catch((e) => {
        alert(e);
      });
  }
}

export default new ChatsController();
