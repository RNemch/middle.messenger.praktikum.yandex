import { Form } from '../../components/form';
import { Password } from '../../components/password';
import { Toggle } from '../../components/toggle';
import Block from '../../utils/block';
import { Router } from '../../utils/router';
import { inputLogin, inputsRegistration, passwordsRegistration } from './const';
import template from './index.pug';

const router = new Router();

export class LoginPage extends Block {
  constructor() {
    super(
      { tagName: 'div' },
      {
        isActive: '',
      },
    );
  }

  init() {
    this.children.toggle = new Toggle({
      onClick: () => {
        if (!Array.isArray(this.children.toogle)) {
          if (!this.props.isActive) {
            this.setProps({
              isActive: 'active',
            });
          } else {
            this.setProps({
              isActive: '',
            });
          }
        }
      },
    });

    this.children.formLogin = new Form({
      name: 'Вход',
      inputs: [inputLogin],
      passwords: [
        new Password({
          id: 'sign-in-password',
          placeholder: 'Пароль',
          name: 'password',
        }),
      ],
      buttonProps: {
        type: 'submit',
        name: 'Авторизоваться',
        className: 'confirm',
        callback: () => router.go('/chats'),
      },
    });

    this.children.formRegistration = new Form({
      name: 'Регистация',
      inputs: inputsRegistration,
      passwords: passwordsRegistration,
      buttonProps: {
        name: 'Зарегистрироваться',
        type: 'submit',
        className: 'confirm',
        callback: () => router.go('/chats'),
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
