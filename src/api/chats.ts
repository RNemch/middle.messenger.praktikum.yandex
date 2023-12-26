import { BaseAPI } from './base';

export default class ChatsApi extends BaseAPI {
  constructor() {
    super('/chats');
  }

  chats(): Promise<XMLHttpRequest> {
    return this.http.get('');
  }

  addChat(data: { title: string }): Promise<XMLHttpRequest> {
    return this.http.post('', data);
  }

  deleteChat(data: { chatId: number }): Promise<XMLHttpRequest> {
    return this.http.delete('', data);
  }
}
