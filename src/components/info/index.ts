import Block from '../../utils/block';
import template from './index.pug';

interface InfoProps {
  label: string;
  text: string;
}

export class Info extends Block {
  constructor(props: InfoProps) {
    super(
      { tagName: 'div', className: 'info' },
      {
        ...props,
      },
    );
  }

  render() {
    return this.compile(template, this.props);
  }
}
