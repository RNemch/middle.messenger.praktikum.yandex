import Block from '../../utils/block';
import template from './index.pug';

interface InputProps {
  type: 'email' | 'text' | 'tel' | 'email' | 'password';
  placeholder?: string;
  name: string;
  text?: string;
  onBlur?: () => void;
  events?: {
    blur: () => void;
  };
}

export class Input extends Block {
  constructor(props: InputProps) {
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
