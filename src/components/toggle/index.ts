import Block from '../../utils/block';
import template from './index.pug';

interface ToggleProps {
  onClick?: () => void;
  events?: {
    click: () => void;
  };
}

export class Toggle extends Block {
  constructor(props: ToggleProps) {
    super(
      { tagName: 'div', className: 'toggle-container' },
      {
        ...props,
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
