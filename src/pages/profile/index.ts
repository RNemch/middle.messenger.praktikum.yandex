import { Button } from '../../components/button/index.ts';
import { Info } from '../../components/info/index.ts';
import Block from '../../utils/block.ts';
import template from './index.pug';
import { data, passwords } from './const.ts';
import { Form } from '../../components/form/index.ts';
import { Input } from '../../components/input/index.ts';
import { addActive } from './script.ts';
import { Router } from '../../utils/router.ts';
import AuthController from '../../controllers/auth-controller.ts';
import { withStore } from '../../utils/store.ts';
import userController from '../../controllers/user-controller.ts';
import { Avatar } from '../../components/avatar/index.ts';
import { Modal } from '../../components/modal/index.ts';
import { InputFile } from '../../components/input-file/index.ts';

const router = new Router();

class ProfilePage extends Block {
  constructor(props: any) {
    super({ tagName: 'main' }, { ...props });
  }

  initChildren() {
    this.children.chatsButton = new Button({
      tagButton: 'a',
      name: '< Чаты',
      type: 'button',
      onClick: () => {
        router.go('/messenger');
      },
    });

    this.children.info = data.map((el) => {
      return new Info({
        label: el.label,
        name: el.name,
        text: this.props[el.name],
      });
    });

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
            value: this.props[el.name],
          }),
      ),
      buttonProps: {
        type: 'submit',
        name: 'Сохранить',
        className: 'profile-btn',
        callback: (el: any) => {
          userController
            .changeProfile(el)
            .then(() => addActive('.profile-info'));
        },
      },
    });

    this.children.formChangePassword = new Form({
      passwords: passwords,
      buttonProps: {
        type: 'submit',
        name: 'Cохранить',
        className: 'profile-btn',
        callback: (el: any) => {
          userController
            .changePassword(el)
            .then(() => addActive('.profile-info'));
        },
      },
    });

    this.children.avatar = new Avatar({
      avatar: this.props.avatar,
      onClick: () => {
        this.setProps({
          isLoadAvatar: true,
        });
      },
    });

    this.children.loadAvatarModal = new Modal({
      name: 'Загрузить картинку',
      close: () => {
        this.setProps({
          isLoadAvatar: false,
        });
      },
      content: [
        new InputFile({
          name: 'avatar',
          onSubmit: (event?: Event) => {
            event?.preventDefault();
            if (!Array.isArray(this.children.loadAvatarModal)) {
              const form = this.children.loadAvatarModal
                .getContent()!
                .querySelector('form') as HTMLFormElement;
              const formData = new FormData(form);

              userController.addAvatar(formData);

              this.setProps({
                isLoadAvatar: false,
              });
            }
          },
        }),
      ],
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

const Page = withStore((state) => ({ ...state.currentUser }));

export default Page(ProfilePage);
