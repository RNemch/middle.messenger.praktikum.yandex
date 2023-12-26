import Block from '../../utils/block';
import template from './index.pug';

interface ModalProps {
  name?: string;
  content: Block;
}

export class Modal extends Block {
  constructor(props: ModalProps) {
    super(
      { tagName: 'div', className: 'modal' },
      {
        ...props,
      },
    );
  }

  render() {
    return this.compile(template, this.props);
  }
}
