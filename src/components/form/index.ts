import Block from '../../utils/block';
import { validation } from '../../utils/validation';
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
      }
    );
  }

  init() {
    this.children.button = new Button({
      ...this.props.buttonProps,
      onClick: (event: any) => {
        event.preventDefault();
        const data: DataForm = {};
        let isSuccess = true;
        this.getContent()
          ?.querySelectorAll('div.input')
          .forEach((el) => {
            isSuccess = validation(el).verify;

            const input = el.querySelector('input');
            data[`${input!.name}`] = input!.value;
          });

        if (isSuccess) {
          console.log(data);
          if (this.props.buttonProps.callback) {
            this.props.buttonProps.callback();
          }
        }
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
