import AutthApi, { SignInData, SignUpData } from '../api/auth';
import { Router } from '../utils/router';

class AuthController {
  private api: AutthApi;

  constructor() {
    this.api = new AutthApi();
  }

  async signIn(data: SignInData) {
    await this.api
      .signIn(data)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(response.response.reason);
        }
        const router = new Router();
        router.go('/messenger');
      })
      .catch((e) => {
        alert(e);
      });
  }

  async signUp(data: SignUpData) {
    await this.api
      .signUp(data)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(response.response.reason);
        }
        const router = new Router();
        router.go('/messenger');
      })
      .catch((e) => {
        alert(e);
      });
  }

  async logout() {
    await this.api.logout().then(() => {
      const router = new Router();
      router.go('/');
    });
  }

  async user() {
    await this.api.user().then((response) => {
      if (response.status !== 200) {
        throw new Error(response.response.reason);
      }
    });
  }
}

export default new AuthController();
