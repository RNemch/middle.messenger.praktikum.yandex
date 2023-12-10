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

function queryStringify(data: Record<string, any>) {
  return Object.entries(data).reduce(
    (acc, e, i) => `${acc}${i > 0 ? '&' : '?'}${e[0]}=${e[1]}`,
    '',
  );
}

export class HTTPTransport {
  get = (url: string, options: Options = { method: METHODS.GET }) => {
    return this.request(url + queryStringify(options.data), options);
  };

  put = (url: string, options: Options = { method: METHODS.PUT }) => {
    return this.request(url, options);
  };

  post = (url: string, options: Options = { method: METHODS.POST }) => {
    return this.request(url, options);
  };

  delete = (url: string, options: Options = { method: METHODS.DELETE }) => {
    return this.request(url, options);
  };

  request = (url: string, options: Options) => {
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

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}
