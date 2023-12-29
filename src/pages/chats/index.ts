import { Button } from '../../components/button';
import Chat from '../../components/chat';
import { ChatPreview } from '../../components/chat-preview';
import { Form } from '../../components/form';
import { Input } from '../../components/input';
import { Modal } from '../../components/modal';
import chatsController from '../../controllers/chats-controller';
import controller from '../../controllers/messages-controller';
import userController from '../../controllers/user-controller';
import Block from '../../utils/block';
import { Router } from '../../utils/router';
import { ChatData, withStore } from '../../utils/store';
import template from './index.pug';

class ChatsPage extends Block {
  constructor(props: any) {
    super(
      { tagName: 'main' },
      {
        chats: null,
        isChangeChat: false,
        isAddChat: false,
        ...props,
      },
    );
  }

  initChildren() {
    if (this.props.chats)
      this.children.chatsPreview = this.props.chats.map((data: ChatData) => {
        const el = new ChatPreview({
          id: data.id,
          icon: data.avatar,
          name: data.title,
          lastMessage: data.last_message?.content,
        });
        el.setProps({
          events: {
            click: async () => {
              el.setProps({
                active: 'active',
              });
              const token = await chatsController.getToken(data.id);
              await controller.connect(data.id, token);
              if (!Array.isArray(this.children.chat)) {
                this.children.chat.setProps({
                  chat: data,
                });
                (this.children.chat as any).initChildren();
                this.children.chat.setProps({
                  chat: data,
                });
              }
              this.setProps({
                isChangeChat: true,
              });
              if (Array.isArray(this.children.chatsPreview)) {
                this.children.chatsPreview.forEach((element) => {
                  if (
                    element
                      .getContent()!
                      .querySelector('.chat-preview-container')!.id !==
                    el.getContent()!.querySelector('.chat-preview-container')!
                      .id
                  ) {
                    element.setProps({
                      active: '',
                    });
                  }
                });
              }
            },
          },
        });

        return el;
      });

    this.children.search = new Input({
      name: 'search',
      type: 'text',
      placeholder: 'Поиск',
      onChange: () => {
        if (!Array.isArray(this.children.search)) {
          const value = this.children.search
            .getContent()
            ?.querySelector('input')?.value;

          value &&
            userController
              .search({ login: value })
              .then((msg) => console.log(msg));
        }
      },
    });

    this.children.chat = new Chat({});

    this.children.profileButton = new Button({
      tagButton: 'a',
      name: 'Профиль >',
      type: 'button',
      onClick: () => {
        const router = new Router();
        router.go('/settings');
      },
    });

    this.children.addChat = new Button({
      tagButton: 'img',
      name: 'add chat',
      type: 'button',
      src: '/image/add.svg',
      onClick: () => {
        this.setProps({
          isAddChat: true,
        });
      },
    });

    this.children.modal = new Modal({
      name: 'Создать чат',
      close: () => {
        this.setProps({
          isAddChat: false,
        });
      },
      content: [
        new Form({
          inputs: [
            new Input({
              name: 'title',
              type: 'text',
              placeholder: 'Название чата',
            }),
          ],
          buttonProps: {
            type: 'submit',
            name: 'Сохранить',
            className: 'modal-btn-submit',
            callback: (data: any) => {
              chatsController.addChat(data).then(() =>
                this.setProps({
                  isAddChat: false,
                }),
              );
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

const Page = withStore((state) => ({ chats: state.chats }));

export default Page(ChatsPage);
