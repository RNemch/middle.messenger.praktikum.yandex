import { Button } from '../../components/button';
import { Info } from '../../components/info';
import Block from '../../utils/block';
import { render } from '../../utils/render';
import template from './index.pug';
import { data, name, passwords } from './const';
import { Form } from '../../components/form';
import { Input } from '../../components/input';
import { addActive } from './script';

interface ProfileProps {
  name: string;
}

export class ProfilePage extends Block {
  constructor(props?: ProfileProps) {
    super(
      { tagName: 'main' },
      {
        ...props,
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
        render('chats');
      },
    });

    this.children.info = data.map(
      (el) =>
        new Info({
          label: el.label,
          text: el.text,
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
        render('login');
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
