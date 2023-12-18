import { Erorr404Page } from './pages/404';
import { Erorr500Page } from './pages/500';
import { ChatsPage } from './pages/chats';
import { LoginPage } from './pages/login';
import { NavPage } from './pages/nav';
import { ProfilePage } from './pages/profile';
import { Router } from './utils/router';

window.addEventListener('DOMContentLoaded', () => {
  const router = new Router('#app');

  router
    .use('/', NavPage)
    .use('/404', Erorr404Page)
    .use('/settings', ProfilePage)
    .use('/chats', ChatsPage)
    .use('/login', LoginPage)
    .use('/500', Erorr500Page);

  router.start();
});
