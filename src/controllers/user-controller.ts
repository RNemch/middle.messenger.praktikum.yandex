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

    httpErrorHandling(response);

    store.set('currentUser', response.response);
  }

  async password(data: UserPassword) {
    const response = await this.api.password(data);

    httpErrorHandling(response);
  }

  async search(data: { login: string }) {
    const response = await this.api.search({ ...data });

    httpErrorHandling(response);

    return response.response;
  }
}

export default new UserController();
