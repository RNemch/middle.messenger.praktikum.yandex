import Block from '../../utils/block.ts';
import template from './index.pug';

interface AvatarProps {
  avatar?: string;
  onClick: () => void;
  events?: {
    click: () => void;
  };
}

export class Avatar extends Block {
  constructor(props: AvatarProps) {
    super(
      { tagName: 'div', className: 'profile-icon' },
      {
        ...props,
        events: {
          click: props.onClick,
        },
      },
    );
  }

  render() {
    return this.compile(template, this.props);
  }
}
