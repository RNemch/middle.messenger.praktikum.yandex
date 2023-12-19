import { Input } from '../../components/input';
import { Password } from '../../components/password';

export const inputsRegistration = [
  new Input({
    type: 'email',
    placeholder: 'Почта',
    name: 'email',
  }),

  new Input({
    type: 'text',
    placeholder: 'Логин',
    name: 'login',
  }),

  new Input({
    type: 'text',
    placeholder: 'Имя',
    name: 'first_name',
  }),

  new Input({
    type: 'text',
    placeholder: 'Фамилия',
    name: 'second_name',
  }),

  new Input({
    type: 'tel',
    placeholder: 'Телефон',
    name: 'phone',
  }),
];

export const inputLogin = new Input({
  type: 'text',
  placeholder: 'Логин',
  name: 'login',
});

export const passwordsRegistration = [
  new Password({
    id: 'sign-up-first-password',
    placeholder: 'Пароль',
    name: 'password',
  }),
  new Password({
    id: 'sign-up-first-second',
    placeholder: 'Пароль (еще раз)',
    name: 'password',
  }),
];
