import { Form } from '../../components/form/index.ts';
import { Toggle } from '../../components/toggle/index.ts';
import AuthController from '../../controllers/auth-controller.ts';
import Block from '../../utils/block.ts';
import { Router } from '../../utils/router.ts';
import { inputsRegistration, passwordsRegistration } from './const.ts';
import template from './index.pug';

const router = new Router();

export class SignUpPage extends Block {
  constructor() {
    super({ tagName: 'div' });
  }

  init() {
    this.children.toggle = new Toggle({
      onClick: () => {
        router.go('/');
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
        callback: (data: any) => AuthController.signUp(data),
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
