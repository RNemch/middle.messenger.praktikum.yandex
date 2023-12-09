import Block from '../../utils/block';
import template from './index.pug';

interface ChatPreviewProps {
  id: string;
  icon: string;
  name: string;
  lastMessage: string;
  //   events?: {
  //     blur: () => void;
  //   };
}

export class ChatPreview extends Block {
  constructor(props: ChatPreviewProps) {
    super(
      { tagName: 'div', className: 'input' },
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
