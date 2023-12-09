import { Password } from '../../components/password';

interface Data {
  label: string;
  text: string;
  type: 'email' | 'text' | 'tel' | 'email' | 'password';
  name: string;
}

export const name = 'Иван Сидоров';

export const data: Data[] = [
  {
    label: 'Почта',
    text: 'Test123@yandex.ru',
    type: 'email',
    name: 'email',
  },
  {
    label: 'Логин',
    text: 'Test123',
    type: 'text',
    name: 'login',
  },
  {
    label: 'Имя',
    text: 'Иван',
    type: 'text',
    name: 'first_name',
  },
  {
    label: 'Фамилия',
    text: 'Сидоров',
    type: 'text',
    name: 'second_name',
  },
  {
    label: 'Имя в чате',
    text: 'Иван Сидоров',
    type: 'text',
    name: 'display_name',
  },
  {
    label: 'Телефон',
    text: '+7 (999) 123-45-67',
    type: 'tel',
    name: 'phone',
  },
];

export const passwords = [
  new Password({
    id: 'old-password',
    placeholder: 'Старый пароль',
    name: 'oldPassword',
  }),
  new Password({
    id: 'new-first-password',
    placeholder: 'Новый пароль',
    name: 'newPassword',
  }),
  new Password({
    id: 'new-second-password',
    placeholder: 'Новый пароль (еще раз)',
    name: 'newPassword',
  }),
];
