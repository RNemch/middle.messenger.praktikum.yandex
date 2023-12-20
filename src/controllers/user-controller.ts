import UserApi, { UserData } from '../api/user';
import { Router } from '../utils/router';
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
        // const router = new Router();
        // router.go('/settings');
      })
      .catch((e) => {
        alert(e);
      });
  }
}

export default new UserController();
