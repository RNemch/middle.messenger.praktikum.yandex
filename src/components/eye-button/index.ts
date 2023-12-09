import Block from '../../utils/block';
import template from './index.pug';

interface EyeProps {
  icon?: 'visibility' | 'visibility_off';
  onClick?: () => void;
  events?: {
    click: () => void;
  };
}

export class Eye extends Block {
  constructor(props: EyeProps) {
    super(
      { tagName: 'span', className: 'eye-button' },
      {
        ...props,
        icon: 'visibility',
        events: {
          click: props.onClick,
        },
      }
    );
  }

  render() {
    return this.compile(template, this.props);
  }
}
