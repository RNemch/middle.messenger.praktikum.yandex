import Block from '../../utils/block';
import { validation } from '../../utils/validation';
import template from './index.pug';

interface InputProps {
  type: 'email' | 'text' | 'tel' | 'email' | 'password';
  placeholder?: string;
  name: string;
  value?: string;
  message?: string;
  events?: {
    click: () => void;
  };
}

export class Input extends Block {
  constructor(props: InputProps) {
    super(
      { tagName: 'div', className: 'input' },
      {
        ...props,
        events: {
          click: () => {
            const elem = this.getContent();
            const input = elem!.querySelector('input');

            if (input && elem) {
              input.addEventListener('blur', () => {
                const message = validation(elem).message;
                this.setProps({
                  value: input.value,
                  message: message,
                });
              });
            }
          },
        },
      }
    );
  }
  render() {
    return this.compile(template, this.props);
  }
}
