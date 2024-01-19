import { Button } from '../../components/button/index.ts';
import Block from '../../utils/block.ts';
import { Router } from '../../utils/router.ts';
import template from './index.pug';

export class Erorr500Page extends Block {
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
