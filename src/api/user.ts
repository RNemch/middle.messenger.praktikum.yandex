import { BaseAPI } from './base';

export interface UserData {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
}

export default class UserApi extends BaseAPI {
  constructor() {
    super('/user');
  }

  profile(data: UserData): Promise<XMLHttpRequest> {
    return this.http.put('/profile', data);
  }
}
