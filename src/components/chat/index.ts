import Block from '../../utils/block';
import template from './index.pug';

interface ChatProps {
  messages?: string[];
  //   events?: {
  //     blur: () => void;
  //   };
}

export class Chat extends Block {
  constructor(props: ChatProps) {
    super(
      { tagName: 'div', className: 'no-messages' },
      {
        ...props,
        //   events: {
        //     click: props.onBlur,
        //   },
      }
    );
  }

  render() {
    return this.compile(template, this.props);
  }
}
