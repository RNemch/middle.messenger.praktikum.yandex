import Block from '../../utils/block';
import template from './index.pug';

interface ChatProps {
  messages?: string[];
}

export class Chat extends Block {
  constructor(props: ChatProps) {
    super(
      { tagName: 'div', className: 'no-messages' },
      {
        ...props,
      },
    );
  }

  render() {
    return this.compile(template, this.props);
  }
}
