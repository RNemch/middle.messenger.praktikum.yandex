import Block from '../../utils/block';
import template from './index.pug';

interface LoadAvatarProps {
  avatar?: string;
  onClick: () => void;
  events?: {
    click: () => void;
  };
}

export class LoadAvatar extends Block {
  constructor(props: LoadAvatarProps) {
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
