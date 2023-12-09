import { ChatsPage } from '../pages/chats';
import { LoginPage } from '../pages/login/index';
import { ProfilePage } from '../pages/profile';

const ROUTES = {
  login: LoginPage,
  chats: ChatsPage,
  profile: ProfilePage,
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
