import { Button } from '../../components/button';
import { Router } from '../../utils/router';
// import { render } from '../../utils/render';

const router = new Router();

export const pages = [
  new Button({
    tagButton: 'a',
    type: 'button',
    name: 'Логин',
    onClick: () => {
      router.go('/login');
    },
  }),
  new Button({
    tagButton: 'a',
    type: 'button',
    name: 'Чаты',
    onClick: () => {
      router.go('/chats');
    },
  }),
  new Button({
    tagButton: 'a',
    type: 'button',
    name: 'Профиль',
    onClick: () => {
      router.go('/settings');
    },
  }),
  new Button({
    tagButton: 'a',
    type: 'button',
    name: '404',
    onClick: () => {
      router.go('/404');
    },
  }),
  new Button({
    tagButton: 'a',
    type: 'button',
    name: '500',
    onClick: () => {
      router.go('/500');
    },
  }),
];
