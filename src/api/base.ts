import { HTTPTransport } from '../utils/http-transport.ts';

export class BaseAPI {
  http: HTTPTransport;

  constructor(url: string) {
    this.http = new HTTPTransport(url);
  }

  create() {
    throw new Error('Not implemented');
  }

  request() {
    throw new Error('Not implemented');
  }

  update() {
    throw new Error('Not implemented');
  }

  delete() {
    throw new Error('Not implemented');
  }
}
