import Block from '../../utils/block';
import { Eye } from '../eye-button';
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
      }
    );
  }

  init() {
    this.children.eye = new Eye({
      icon: 'visibility',
      onClick: () => {
        if (!Array.isArray(this.children.eye)) {
          // @ts-ignore
          if (this.children.eye.props.icon === 'visibility') {
            this.children.eye.setProps({
              icon: 'visibility_off',
            });
            this.setProps({
              type: 'text',
              value: this.getContent()?.querySelector('input')?.value,
            });
          } else {
            this.children.eye.setProps({
              icon: 'visibility',
            });
            this.setProps({
              type: 'password',
              value: this.getContent()?.querySelector('input')?.value,
            });
          }
        }
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
