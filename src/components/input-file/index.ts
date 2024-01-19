import Block from '../../utils/block.ts';
import template from './index.pug';

interface InputFileProps {
  title?: string;
  name: string;
  accept?: string;
  onSubmit?: (event?: Event) => void;
  events?: {
    submit?: (event?: Event) => void;
  };
}

export class InputFile extends Block {
  constructor(props: InputFileProps) {
    super(
      {
        tagName: 'form',
        className: 'input-file',
        attributes: [
          { name: 'enctype', value: 'multipart/form-data' },
          { name: 'method', value: 'post' },
        ],
      },
      {
        ...props,
        events: {
          submit: props.onSubmit,
        },
      },
    );
  }

  render() {
    return this.compile(template, this.props);
  }
}
