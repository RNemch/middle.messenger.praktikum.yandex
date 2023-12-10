import { Button } from '../../components/button';
import { Chat } from '../../components/chat';
import { Input } from '../../components/input';
import Block from '../../utils/block';
import { render } from '../../utils/render';
import template from './index.pug';

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
