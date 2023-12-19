enum METHODS {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
}

interface Options {
  method: METHODS;
  data?: any;
}

type HTTPMethod = (url: string, data?: unknown) => Promise<XMLHttpRequest>;
type HTTPRequest = (url: string, option: Options) => Promise<XMLHttpRequest>;

function queryStringify(data: Record<string, any>) {
  return Object.entries(data).reduce(
    (acc, e, i) => `${acc}${i > 0 ? '&' : '?'}${e[0]}=${e[1]}`,
    '',
  );
}

export class HTTPTransport {
  endpoint: string;
  private API_URL = 'https://ya-praktikum.tech/api/v2';

  constructor(endpoint: string) {
    this.endpoint = `${this.API_URL}${endpoint}`;
  }

  get: HTTPMethod = (url, data?) => {
    if (data) {
      return this.request(this.endpoint + url + queryStringify(data), {
        method: METHODS.GET,
      });
    } else {
      return this.request(this.endpoint + url, {
        method: METHODS.GET,
      });
    }
  };

  put: HTTPMethod = (url, data) => {
    return this.request(this.endpoint + url, {
      method: METHODS.PUT,
      data,
    });
  };

  post: HTTPMethod = (url, data) => {
    return this.request(this.endpoint + url, {
      method: METHODS.POST,
      data,
    });
  };

  delete: HTTPMethod = (url, data) => {
    return this.request(this.endpoint + url, {
      method: METHODS.DELETE,
      data,
    });
  };

  request: HTTPRequest = (url, options) => {
    const { method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url, true);

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      xhr.setRequestHeader('Content-Type', 'application/json');

      xhr.withCredentials = true;
      xhr.responseType = 'json';

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
