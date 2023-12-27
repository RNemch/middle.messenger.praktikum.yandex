import { BaseAPI } from './base';

export interface UserData {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
}

export interface UserPassword {
  oldPassword: string;
  newPassword: string;
}

export default class UserApi extends BaseAPI {
  constructor() {
    super('/user');
  }

  profile(data: UserData): Promise<XMLHttpRequest> {
    return this.http.put('/profile', data);
  }

  password(data: UserPassword): Promise<XMLHttpRequest> {
    return this.http.put('/password', data);
  }

  search(data: { login: string }): Promise<XMLHttpRequest> {
    return this.http.post('/search', data);
  }

  addAvatar(data: FormData): Promise<XMLHttpRequest> {
    return this.http.put('/profile/avatar', data, true);
  }
}
