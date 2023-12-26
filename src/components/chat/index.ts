import chatsController from '../../controllers/chats-controller';
import userController from '../../controllers/user-controller';
import Block from '../../utils/block';
import { User } from '../../utils/store';
import { Button } from '../button';
import { ChatPreview } from '../chat-preview';
import { Form } from '../form';
import { Input } from '../input';
import { Modal } from '../modal';
import template from './index.pug';

export class Chat extends Block {
  constructor(props: any) {
    super(
      { tagName: 'div', className: 'chat' },
      {
        messages: new Array(''),
        isSettings: false,
        isAddUser: false,
        isUsers: false,
        isDelUserList: false,
        ...props,
      },
    );
  }

  private addMessage = () => {
    if (!Array.isArray(this.children.addMessage) && this.children.addMessage) {
      const el = this.children.addMessage.getContent();
      const value = el!.querySelector('input')!.value;

      let messages = this.props.messages;
      if (Array.isArray(messages)) {
        messages.push(value);
      } else {
        messages = [value];
      }

      if (!Array.isArray(this.children.messages))
        this.setProps({
          messages: messages,
        });

      this.children.addMessage.setProps({
        value: '',
      });

      el?.querySelector('input')?.focus();

      console.log({ message: value });
    }
  };

  initChildren() {
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
      onClick: (event: any) => {
        event.preventDefault();
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
          onClick: () => {
            chatsController
              .deleteChat({ chatId: this.props.chat.id })
              .then(() =>
                this.setProps({
                  isSettings: false,
                }),
              );
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
                    console.log(el);
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
