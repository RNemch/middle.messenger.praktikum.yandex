import { Form } from '../../components/form/index.ts';
import { Password } from '../../components/password/index.ts';
import { Toggle } from '../../components/toggle/index.ts';
import AuthController from '../../controllers/auth-controller.ts';
import Block from '../../utils/block.ts';
import { Router } from '../../utils/router.ts';
import { inputLogin } from './const.ts';
import template from './index.pug';

const router = new Router();

class SignInPage extends Block {
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

export default SignInPage;
