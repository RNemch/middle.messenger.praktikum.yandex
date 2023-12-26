import chatsController from '../../controllers/chats-controller';
import Block from '../../utils/block';
import { ChatData } from '../../utils/store';
import { Button } from '../button';
import { ChatPreview } from '../chat-preview';
import { Input } from '../input';
import { Modal } from '../modal';
import template from './index.pug';

interface ChatProps {
  messages?: string[];
  chat?: ChatData;
  isSettings?: boolean;
}

export class Chat extends Block {
  constructor(props: ChatProps) {
    super(
      { tagName: 'div', className: 'chat' },
      {
        messages: new Array(''),
        isSettings: false,
        ...props,
      },
    );
  }

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
    });

    this.children.pushMessage = new Button({
      type: 'submit',
      name: '>',
      onClick: (event: any) => {
        event.preventDefault();
        if (
          !Array.isArray(this.children.addMessage) &&
          this.children.addMessage
        ) {
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
      content: new Button({
        tagButton: 'img',
        type: 'button',
        name: 'Удалить чат',
        displayName: 'Удалить чат',
        src: '/image/delete_forever.svg',
        // className: 'modal-btn-submit',
        onClick: () => {
          chatsController.deleteChat({ chatId: this.props.chat.id });
          this.setProps({
            isSettings: false,
          });
        },
      }),
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
