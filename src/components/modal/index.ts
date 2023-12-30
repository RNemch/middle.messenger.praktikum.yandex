import Block from '../../utils/block';
import { Button } from '../button';
import template from './index.pug';

interface ModalProps {
  name?: string;
  content: Block[];
  close?: () => void;
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

  initChildren() {
    this.children.closeButton = new Button({
      tagButton: 'img',
      name: 'close',
      type: 'button',
      src: '/image/close.svg',
      className: 'modal-close-btn',
      onClick: this.props.close,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
