import Block from '../../utils/block';
import { Button } from '../button';
import { ChatPreview } from '../chat-preview';
import { Input } from '../input';
import template from './index.pug';

interface ChatProps {
  messages?: string[];
}

export class Chat extends Block {
  constructor(props: ChatProps) {
    super(
      { tagName: 'div', className: 'chat' },
      {
        messages: new Array(''),
        ...props,
      },
    );
  }

  init() {
    this.children.head = new ChatPreview({
      id: 'active',
      icon: '',
      name: 'Вадим',
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
  }

  render() {
    return this.compile(template, this.props);
  }
}
