import Block from '../../utils/block';
import template from './index.pug';

interface MessageProps {
  content: string;
  isMine: boolean;
}

export class Message extends Block {
  constructor(props: MessageProps) {
    super(
      { tagName: 'div' },
      {
        ...props,
      },
    );
  }

  render() {
    return this.compile(template, this.props);
  }
}
