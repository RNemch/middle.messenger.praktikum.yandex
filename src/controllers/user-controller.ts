import UserApi, { UserData, UserPassword } from '../api/user';
import store from '../utils/store';

class UserController {
  private api: UserApi;

  constructor() {
    this.api = new UserApi();
  }

  async profile(data: UserData) {
    await this.api
      .profile(data)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(response.response.reason);
        }
        store.set('currentUser', response.response);
      })
      .catch((e) => {
        alert(e);
      });
  }

  async password(data: UserPassword) {
    await this.api
      .password(data)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(response.response.reason);
        }
      })
      .catch((e) => {
        alert(e);
      });
  }
}

export default new UserController();
