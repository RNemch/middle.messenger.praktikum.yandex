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
    const router = new Router();

    try {
      httpErrorHandling(response);

      router.go('/messenger');
    } catch (e) {
      console.log(e, e === 'User already in system');
      if (e === 'User already in system') router.go('/messenger');
      else alert(e);
    }
  }

  async signUp(data: SignUpData) {
    const response = await this.api.signUp(data);
    const router = new Router();

    try {
      httpErrorHandling(response);

      router.go('/messenger');
    } catch (e) {
      if (e === 'User already in system') router.go('/messenger');
      else alert(e);
    }
  }

  async logout() {
    const response = await this.api.logout();

    try {
      httpErrorHandling(response);

      const router = new Router();
      router.go('/');
    } catch (e) {
      alert(e);
    }
  }

  async user() {
    const response = await this.api.user();

    try {
      httpErrorHandling(response);

      store.set('currentUser', response.response);
    } catch (e) {
      alert(e);
      throw new Error(e as string);
    }
  }
}

export default new AuthController();
