import { BaseAPI } from './base';

export interface SignInData {
  login: string;
  password: string;
}

export interface SignUpData {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export default class AutthApi extends BaseAPI {
  constructor() {
    super('/auth');
  }

  signIn(data: SignInData): Promise<XMLHttpRequest> {
    return this.http.post('/signin', data);
  }

  signUp(data: SignUpData): Promise<XMLHttpRequest> {
    return this.http.post('/signup', data);
  }

  logout(): Promise<XMLHttpRequest> {
    return this.http.post('/logout');
  }

  user(): Promise<XMLHttpRequest> {
    return this.http.get('/user');
  }
}
