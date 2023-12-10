import { Button } from '../../components/button';
import { Chat } from '../../components/chat';
import { Input } from '../../components/input';
import Block from '../../utils/block';
import { render } from '../../utils/render';
import template from './index.pug';
import { ChatPreview } from '../../components/chat-preview';

interface ChatsProps {}

export class ChatsPage extends Block {
  constructor(props?: ChatsProps) {
    super(
      { tagName: 'main' },
      {
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

    this.children.chats = [
      new ChatPreview({
        id: 'one',
        icon: '',
        name: 'Андрей',
        lastMessage: 'Изображение',
        chatList: () => {
          if (Array.isArray(this.children.chats))
            return this.children.chats.map(
              (el) => el.getContent()?.querySelector('.chat-preview-container'),
            );
        },
      }),
      new ChatPreview({
        id: 'two',
        icon: '',
        name: 'Киноклуб',
        lastMessage:
          'Тут очень интересный текст, который непременно нужно прочитать',
      }),
    ];

    this.children.chat = new Chat({});

    this.children.profileButton = new Button({
      tagButton: 'a',
      name: 'Профиль >',
      type: 'button',
      onClick: () => {
        render('profile');
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
