import { Button } from '../../components/button';
import { render } from '../../utils/render';

export const pages = [
  new Button({
    tagButton: 'a',
    type: 'button',
    name: 'Логин',
    onClick: () => {
      render('login');
    },
  }),
  new Button({
    tagButton: 'a',
    type: 'button',
    name: 'Чаты',
    onClick: () => {
      render('chats');
    },
  }),
  new Button({
    tagButton: 'a',
    type: 'button',
    name: 'Профиль',
    onClick: () => {
      render('profile');
    },
  }),
  new Button({
    tagButton: 'a',
    type: 'button',
    name: '404',
    onClick: () => {
      render('error404');
    },
  }),
  new Button({
    tagButton: 'a',
    type: 'button',
    name: '500',
    onClick: () => {
      render('error500');
    },
  }),
];
