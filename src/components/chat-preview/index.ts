import Block from '../../utils/block';
import template from './index.pug';

interface ChatPreviewProps {
  id: string;
  icon: string;
  name: string;
  lastMessage: string;
  active?: 'active' | '';
  onClick?: any;
  events?: {
    click: () => void;
  };
}

export class ChatPreview extends Block {
  constructor(props: ChatPreviewProps) {
    super(
      { tagName: 'div' },
      {
        active: '',
        ...props,
        events: {
          click: () => {
            this.setProps({
              active: 'active',
            });
          },
        },
      },
    );
  }

  render() {
    return this.compile(template, this.props);
  }
}
