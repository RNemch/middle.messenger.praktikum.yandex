import Block from '../../utils/block.ts';
import { Eye } from '../eye-button/index.ts';
import { Input } from '../input/index.ts';
import template from './index.pug';

interface PasswordProps {
  id: string;
  name: string;
  placeholder: string;
  type?: 'password' | 'text';
  icon?: 'visibility' | 'visibility_off';
  value?: string;
}

export class Password extends Block {
  constructor(props: PasswordProps) {
    super(
      { tagName: 'div', className: 'password' },
      {
        ...props,
        type: 'password',
        icon: 'visibility',
      },
    );
  }

  init() {
    this.children.eye = new Eye({
      icon: 'visibility',
      onClick: () => {
        if (
          !Array.isArray(this.children.eye) &&
          !Array.isArray(this.children.input)
        ) {
          const isVisibitity = this.children.eye
            .getContent()
            ?.querySelector('img')!
            .src.endsWith('visibility.svg');

          if (isVisibitity) {
            this.children.eye.setProps({
              icon: 'visibility_off',
            });
            this.children.input.setProps({
              type: 'text',
              value: this.getContent()?.querySelector('input')?.value,
            });
          } else {
            this.children.eye.setProps({
              icon: 'visibility',
            });
            this.children.input.setProps({
              type: 'password',
              value: this.getContent()?.querySelector('input')?.value,
            });
          }
        }
      },
    });

    this.children.input = new Input({
      type: this.props.type,
      name: this.props.name,
      placeholder: this.props.placeholder,
      value: this.props.value,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
