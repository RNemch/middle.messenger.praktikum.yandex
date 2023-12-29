import { Button } from '../../components/button';
import Block from '../../utils/block';
import { Router } from '../../utils/router';
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
        const router = new Router();
        router.go('/messenger');
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
