import { Form } from '../../components/form';
import { Password } from '../../components/password';
import { Toggle } from '../../components/toggle';
import AuthController from '../../controllers/auth-controller';
import Block from '../../utils/block';
import { Router } from '../../utils/router';
import { inputLogin } from './const';
import template from './index.pug';

const router = new Router();

export class SignInPage extends Block {
  constructor() {
    super({ tagName: 'div' });
  }

  init() {
    this.children.toggle = new Toggle({
      onClick: () => {
        router.go('/sign-up');
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
        callback: (data: any) => AuthController.signIn(data),
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
