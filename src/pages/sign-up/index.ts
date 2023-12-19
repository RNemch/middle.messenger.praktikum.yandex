import { Form } from '../../components/form';
import { Toggle } from '../../components/toggle';
import AuthController from '../../controllers/auth-controller';
import Block from '../../utils/block';
import { Router } from '../../utils/router';
import { inputsRegistration, passwordsRegistration } from './const';
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
