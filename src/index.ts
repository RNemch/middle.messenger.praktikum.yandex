import { Erorr404Page } from './pages/404';
import { Erorr500Page } from './pages/500';
import { ChatsPage } from './pages/chats';
import { ProfilePage } from './pages/profile';
import { SignInPage } from './pages/sign-in';
import { SignUpPage } from './pages/sign-up';
import { Router } from './utils/router';

window.addEventListener('DOMContentLoaded', () => {
  const router = new Router('#app');

  router
    .use('/', SignInPage)
    .use('/404', Erorr404Page)
    .use('/settings', ProfilePage)
    .use('/messenger', ChatsPage)
    .use('/sign-up', SignUpPage)
    .use('/500', Erorr500Page);

  router.start();
});
