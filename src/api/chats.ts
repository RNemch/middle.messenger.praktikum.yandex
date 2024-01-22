import { BaseAPI } from './base.ts';

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

  addUser(data: { users: number[]; chatId: number }): Promise<XMLHttpRequest> {
    return this.http.put('/users', data);
  }

  getUsers(data: { id: number }): Promise<XMLHttpRequest> {
    return this.http.get(`/${data.id}/users`);
  }

  delUser(data: { users: number[]; chatId: number }): Promise<XMLHttpRequest> {
    return this.http.delete('/users', data);
  }

  addAvatar(data: FormData): Promise<XMLHttpRequest> {
    return this.http.put('/avatar', data, true);
  }

  async getToken(id: number): Promise<string> {
    const response = await this.http.post(`/token/${id}`);

    return response.response.token;
  }
}
