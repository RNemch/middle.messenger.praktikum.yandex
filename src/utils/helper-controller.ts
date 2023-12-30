import { Router } from './router';

export const httpErrorHandling = (response: XMLHttpRequest) => {
  const router = new Router();
  if (response.status === 500) {
    router.go('/500');
  } else if (response.status !== 200) {
    throw response.response.reason;
  }
};
