import { Router } from './router';

export const httpErrorHandling = (response: XMLHttpRequest) => {
  const router = new Router();
  try {
    if (response.status === 500) {
      router.go('/500');
    } else if (response.status !== 200) {
      throw new Error(response.response.reason);
    }
  } catch (e) {
    alert(e);
  }
};
