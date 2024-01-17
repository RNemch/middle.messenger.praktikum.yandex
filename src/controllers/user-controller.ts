import UserApi, { UserData, UserPassword } from '../api/user.ts';
import { httpErrorHandling } from '../utils/helper-controller.ts';
import store from '../utils/store.ts';

class UserController {
  private api: UserApi;

  constructor() {
    this.api = new UserApi();
  }

  async changeProfile(data: UserData) {
    const response = await this.api.profile(data);

    try {
      httpErrorHandling(response);

      store.set('currentUser', response.response);
    } catch (e) {
      alert(e);
    }
  }

  async changePassword(data: UserPassword) {
    const response = await this.api.password(data);

    try {
      httpErrorHandling(response);
    } catch (e) {
      alert(e);
    }
  }

  async search(data: { login: string }) {
    const response = await this.api.search({ ...data });

    try {
      httpErrorHandling(response);

      return response.response;
    } catch (e) {
      alert(e);
    }
  }

  async addAvatar(data: FormData) {
    const response = await this.api.addAvatar(data);

    try {
      httpErrorHandling(response);

      store.set('currentUser', response.response);
    } catch (e) {
      alert(e);
    }
  }
}

export default new UserController();
