import { Button } from '../../components/button';
import { Chat } from '../../components/chat';
import { Input } from '../../components/input';
import Block from '../../utils/block';
import { render } from '../../utils/render';
import { chats } from './const';
import template from './index.pug';

interface ChatsProps {
  isChangeChat?: boolean;
}

export class ChatsPage extends Block {
  constructor(props?: ChatsProps) {
    super(
      { tagName: 'main' },
      {
        isChangeChat: false,
        ...props,
      },
    );
  }

  init() {
    this.children.search = new Input({
      name: 'searc',
      type: 'text',
      placeholder: 'Поиск',
    });

    this.children.chat = new Chat({});

    this.children.profileButton = new Button({
      tagButton: 'a',
      name: 'Профиль >',
      type: 'button',
      onClick: () => {
        render('profile');
      },
    });

    this.children.chats = chats.map((el) => {
      el.setProps({
        events: {
          click: () => {
            el.setProps({
              active: 'active',
            });
            this.setProps({
              isChangeChat: true,
            });
            if (Array.isArray(this.children.chats)) {
              this.children.chats.forEach((element) => {
                if (
                  element
                    .getContent()!
                    .querySelector('.chat-preview-container')!.id !==
                  el.getContent()!.querySelector('.chat-preview-container')!.id
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
  }

  render() {
    return this.compile(template, this.props);
  }
}
