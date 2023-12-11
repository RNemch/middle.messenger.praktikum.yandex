import { Button } from '../../components/button';
import Block from '../../utils/block';
import { render } from '../../utils/render';
import template from './index.pug';

export class Erorr404Page extends Block {
  constructor() {
    super({ tagName: 'nav' });
  }

  init() {
    this.children.linkToChat = new Button({
      tagButton: 'a',
      name: 'Назад к чатам',
      type: 'button',
      onClick: () => {
        render('chats');
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
