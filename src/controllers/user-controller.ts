import UserApi, { UserData, UserPassword } from '../api/user';
import { httpErrorHandling } from '../utils/helper-controller';
import store from '../utils/store';

class UserController {
  private api: UserApi;

  constructor() {
    this.api = new UserApi();
  }

  async profile(data: UserData) {
    const response = await this.api.profile(data);

    try {
      httpErrorHandling(response);

      store.set('currentUser', response.response);
    } catch (e) {
      alert(e);
    }
  }

  async password(data: UserPassword) {
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
    for (let [name, value] of data) {
      console.log('data', name, value);
    }

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
