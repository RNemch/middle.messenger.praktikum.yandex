import { Erorr404Page } from './pages/404/index.ts';
import { Erorr500Page } from './pages/500/index.ts';
import ChatsPage from './pages/chats/index.ts';
import ProfilePage from './pages/profile/index.ts';
import SignInPage from './pages/sign-in/index.ts';
import { SignUpPage } from './pages/sign-up/index.ts';
import { Router } from './utils/router.ts';

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
