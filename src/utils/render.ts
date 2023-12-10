import { Erorr404Page } from '../pages/404';
import { Erorr500Page } from '../pages/500';
import { ChatsPage } from '../pages/chats';
import { LoginPage } from '../pages/login/index';
import { NavPage } from '../pages/nav';
import { ProfilePage } from '../pages/profile';

const ROUTES = {
  nav: NavPage,
  login: LoginPage,
  chats: ChatsPage,
  profile: ProfilePage,
  error404: Erorr404Page,
  error500: Erorr500Page,
};

export function render(name?: keyof typeof ROUTES) {
  const root = document.querySelector('#app')!;
  root.innerHTML = '';
  if (name) {
    const Page = ROUTES[name];
    const page = new Page();
    root.append(page.getContent()!);
    page.dispatchComponentDidMoun();
  }
}
