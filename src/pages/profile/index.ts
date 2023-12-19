import { Button } from '../../components/button';
import { Info } from '../../components/info';
import Block from '../../utils/block';
import template from './index.pug';
import { data, name, passwords } from './const';
import { Form } from '../../components/form';
import { Input } from '../../components/input';
import { addActive } from './script';
import { Router } from '../../utils/router';
import AuthController from '../../controllers/auth-controller';

const router = new Router();

export class ProfilePage extends Block {
  constructor() {
    super(
      { tagName: 'main' },
      {
        name: name,
      },
    );
  }

  init() {
    this.children.chatsButton = new Button({
      tagButton: 'a',
      name: '< Чаты',
      type: 'button',
      onClick: () => {
        router.go('/messenger');
      },
    });

    this.children.info = data.map(
      (el) =>
        new Info({
          label: el.label,
          text: el.value,
        }),
    );

    this.children.changeDataButton = new Button({
      name: 'Изменить данные',
      type: 'button',
      className: 'profile-btn',
      onClick: () => {
        addActive('.profile-change-data');
      },
    });
    this.children.changePasswordButton = new Button({
      name: 'Изменить пароль',
      type: 'button',
      className: 'profile-btn',
      onClick: () => {
        addActive('.profile-change-password');
      },
    });
    this.children.exitButton = new Button({
      name: 'Выход',
      type: 'button',
      className: 'profile-btn red',
      onClick: () => {
        AuthController.logout();
      },
    });

    this.children.formChangeData = new Form({
      inputs: data.map(
        (el) =>
          new Input({
            ...el,
          }),
      ),
      buttonProps: {
        type: 'submit',
        name: 'Сохранить',
        className: 'profile-btn',
        callback: () => {
          addActive('.profile-info');
        },
      },
    });

    this.children.formChangePassword = new Form({
      passwords: passwords,
      buttonProps: {
        type: 'submit',
        name: 'Cохранить',
        className: 'profile-btn',
        callback: () => {
          addActive('.profile-info');
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
