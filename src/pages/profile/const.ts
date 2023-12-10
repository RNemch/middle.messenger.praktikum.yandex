import { Password } from '../../components/password';

interface Data {
  label: string;
  value: string;
  type: 'email' | 'text' | 'tel' | 'email' | 'password';
  name: string;
}

export const name = 'Иван Сидоров';

export const data: Data[] = [
  {
    label: 'Почта',
    value: 'Test123@yandex.ru',
    type: 'email',
    name: 'email',
  },
  {
    label: 'Логин',
    value: 'Test123',
    type: 'text',
    name: 'login',
  },
  {
    label: 'Имя',
    value: 'Иван',
    type: 'text',
    name: 'first_name',
  },
  {
    label: 'Фамилия',
    value: 'Сидоров',
    type: 'text',
    name: 'second_name',
  },
  {
    label: 'Имя в чате',
    value: 'Иван Сидоров',
    type: 'text',
    name: 'display_name',
  },
  {
    label: 'Телефон',
    value: '+79991234567',
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
