import chatsController from '../../controllers/chats-controller.ts';
import userController from '../../controllers/user-controller.ts';
import controller from '../../controllers/messages-controller.ts';
import Block from '../../utils/block.ts';
import { User, withStore } from '../../utils/store.ts';
import { Button } from '../button/index.ts';
import { ChatPreview } from '../chat-preview/index.ts';
import { Form } from '../form/index.ts';
import { Input } from '../input/index.ts';
import { Modal } from '../modal/index.ts';
import template from './index.pug';
import { validation } from '../../utils/validation.ts';
import { InputFile } from '../input-file/index.ts';

class Chat extends Block {
  constructor(props: any) {
    super(
      { tagName: 'div', className: 'chat' },
      {
        messages: new Array(''),
        isSettings: false,
        isAddUser: false,
        isUsers: false,
        isDelUserList: false,
        isAddIcon: false,
        ...props,
      },
    );
  }

  private addMessage = () => {
    if (!Array.isArray(this.children.addMessage) && this.children.addMessage) {
      const el = this.children.addMessage.getContent();
      const value = el!.querySelector('input')!.value;

      const resultValidation = validation(el!);

      if (resultValidation.verify) {
        controller.sendMessage(this.props.chat.id, value);

        this.children.addMessage.setProps({
          value: '',
        });
      }
    }
  };

  initChildren() {
    setTimeout(() => {
      const messages = this.getContent()?.getElementsByClassName('messages');

      if (messages![0]) {
        messages![0].scrollTo(0, messages![0].scrollHeight);
      }
    });

    if (this.props.chat)
      this.children.head = new ChatPreview({
        id: 'active',
        icon: '',
        name: this.props.chat.title,
        lastMessage: '',
      });

    this.children.addMessage = new Input({
      type: 'text',
      name: 'message',
      placeholder: 'Сообщение',
      onEnter: () => {
        this.addMessage();
      },
    });

    this.children.pushMessage = new Button({
      type: 'submit',
      name: '>',
      onClick: (event?: Event) => {
        event?.preventDefault();
        this.addMessage();
      },
    });

    this.children.settings = new Button({
      tagButton: 'img',
      type: 'button',
      name: 'settings',
      src: '/image/more_vert.svg',
      className: 'settings-btn',
      onClick: () => {
        this.setProps({ isSettings: true });
      },
    });

    this.children.addIcon = new Modal({
      name: 'Изменить иконку чата',
      close: () => {
        this.setProps({
          isAddIcon: false,
        });
      },
      content: [
        new InputFile({
          name: 'avatar',
          onSubmit: (event?: Event) => {
            event?.preventDefault();
            if (!Array.isArray(this.children.addIcon)) {
              const form = this.children.addIcon
                .getContent()!
                .querySelector('form') as HTMLFormElement;
              const formData = new FormData(form);
              formData.append('chatId', this.props.chat.id);

              chatsController.addAvatar(formData);

              this.setProps({
                isAddIcon: false,
              });
            }
          },
        }),
      ],
    });

    this.children.settingsModal = new Modal({
      close: () => {
        this.setProps({
          isSettings: false,
        });
      },
      content: [
        new Button({
          tagButton: 'img',
          type: 'button',
          name: 'Удалить чат',
          displayName: 'Удалить чат',
          src: '/image/delete_forever.svg',
          onClick: async () => {
            await chatsController.deleteChat({ chatId: this.props.chat.id });

            this.setProps({
              isSettings: false,
            });
          },
        }),
        new Button({
          tagButton: 'img',
          type: 'button',
          name: 'Добавить пользователя в чат',
          displayName: 'Добавить пользователя в чат',
          src: '/image/add_circle.svg',
          onClick: () => {
            this.setProps({
              isSettings: false,
              isAddUser: true,
            });
          },
        }),
        new Button({
          tagButton: 'img',
          type: 'button',
          name: 'Удалить пользователя из чата',
          displayName: 'Удалить пользователя из чата',
          src: '/image/cancel.svg',
          onClick: () => {
            chatsController
              .getUsers({ id: this.props.chat.id })
              .then((msg: Omit<User, 'phone' | 'email'>[]) => {
                this.children.delUsers = new Modal({
                  name: 'Удалить пользователя из чата',
                  close: () => {
                    this.setProps({
                      isDelUserList: false,
                    });
                  },
                  content: msg.map((el) => {
                    const button = new Button({
                      tagButton: 'a',
                      name: el.login,
                      type: 'button',
                      onClick: () => {
                        chatsController.delUser({
                          users: [el.id],
                          chatId: this.props.chat.id,
                        });
                        this.setProps({
                          isDelUserList: false,
                        });
                      },
                    });

                    return button;
                  }),
                });
                this.setProps({
                  isDelUserList: true,
                  isSettings: false,
                });
              });
          },
        }),
        new Button({
          tagButton: 'img',
          type: 'button',
          name: 'Изменить иконку чата',
          displayName: 'Изменить иконку чата',
          src: '/image/add_photo_alternate.svg',
          onClick: () => {
            this.setProps({
              isSettings: false,
              isAddIcon: true,
            });
          },
        }),
      ],
    });

    this.children.addUserModal = new Modal({
      name: 'Добавить пользователя в чат',
      close: () => {
        this.setProps({
          isAddUser: false,
        });
      },
      content: [
        new Form({
          inputs: [
            new Input({
              type: 'text',
              name: 'login',
              placeholder: 'Поиск пользователя',
            }),
          ],
          buttonProps: {
            type: 'button',
            name: 'search',
            className: 'modal-btn-submit',
            callback: (data: any) => {
              userController
                .search({ ...data })
                .then((msg: Omit<User, 'phone' | 'email'>[]) => {
                  this.children.users = new Modal({
                    name: 'Добавить пользователя в чат',
                    close: () => {
                      this.setProps({
                        isUsers: false,
                      });
                    },
                    content: msg.map((el) => {
                      const button = new Button({
                        tagButton: 'a',
                        name: el.login,
                        type: 'button',
                        onClick: () => {
                          chatsController.addUser({
                            users: [el.id],
                            chatId: this.props.chat.id,
                          });
                          this.setProps({
                            isUsers: false,
                          });
                        },
                      });

                      return button;
                    }),
                  });
                  this.setProps({
                    isAddUser: false,
                    isUsers: true,
                  });
                });
            },
          },
        }),
      ],
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

const Page = withStore((store) => ({
  messages: store.messages,
  userId: store.currentUser?.id,
}));

export default Page(Chat);
