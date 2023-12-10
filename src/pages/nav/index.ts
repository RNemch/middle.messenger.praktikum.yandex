import Block from '../../utils/block';
import { pages } from './const';
import template from './index.pug';

export class NavPage extends Block {
  constructor() {
    super({ tagName: 'nav' });
  }

  init() {
    this.children.linksToPage = pages;
  }

  render() {
    return this.compile(template, this.props);
  }
}
