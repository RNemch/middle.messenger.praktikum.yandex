import Block from '../../utils/block.ts';
import template from './index.pug';

interface ButtonProps {
  tagButton?: 'button' | 'a' | 'img';
  type: 'submit' | 'button';
  name: string;
  src?: string;
  displayName?: string;
  className?: string;
  onClick?: (event?: Event) => void;
  events?: {
    click: (event?: Event) => void;
  };
}

export class Button extends Block {
  constructor(props: ButtonProps) {
    super(
      { tagName: 'div', className: 'button' },
      {
        tagButton: 'button',
        className: '',
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
