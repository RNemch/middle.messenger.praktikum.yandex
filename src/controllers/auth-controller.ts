import AutthApi, { SignInData, SignUpData } from '../api/auth';
import { httpErrorHandling } from '../utils/helper-controller';
import { Router } from '../utils/router';
import store from '../utils/store';

class AuthController {
  private api: AutthApi;

  constructor() {
    this.api = new AutthApi();
  }

  async signIn(data: SignInData) {
    const response = await this.api.signIn(data);

    httpErrorHandling(response);

    const router = new Router();
    router.go('/messenger');
  }

  async signUp(data: SignUpData) {
    const response = await this.api.signUp(data);

    httpErrorHandling(response);

    const router = new Router();
    router.go('/messenger');
  }

  async logout() {
    const response = await this.api.logout();

    httpErrorHandling(response);

    const router = new Router();
    router.go('/');
  }

  async user() {
    const response = await this.api.user();

    httpErrorHandling(response);

    store.set('currentUser', response.response);
  }
}

export default new AuthController();
