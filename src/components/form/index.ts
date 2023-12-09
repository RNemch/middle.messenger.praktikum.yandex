import Block from '../../utils/block';
import { Button } from '../button';
import { Input } from '../input';
import { Password } from '../password';
import template from './index.pug';

interface FormProps {
  name?: string;
  inputs?: Input[];
  passwords?: Password[];
  buttonProps: {
    type: string;
    name: string;
    className: string;
    callback?: () => void;
  };
}

interface DataForm {
  [index: string]: string;
}

export class Form extends Block {
  constructor(props: FormProps) {
    super(
      { tagName: 'form' },
      {
        ...props,
        button: {},
      }
    );
  }

  init() {
    this.children.button = new Button({
      ...this.props.buttonProps,
      onClick: (event: any) => {
        event.preventDefault();
        const data: DataForm = {};
        this.getContent()
          ?.querySelectorAll('div')
          .forEach((el) => {
            const input = el.querySelector('input');
            if (input) {
              data[`${input.name}`] = input.value;
            }
          });
        console.log(data);
        if (this.props.buttonProps.callback) {
          this.props.buttonProps.callback();
        }
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
