import userController from '../../controllers/user-controller';
import Block from '../../utils/block';
import template from './index.pug';

interface InputFileProps {
  title?: string;
  name: string;
  accept?: string;
  onSubmit?: (event?: any) => void;
  events?: {
    submit?: (event?: any) => void;
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
          submit: (event: any) => {
            event.preventDefault();
            const form = this.getContent() as HTMLFormElement;
            const formData = new FormData(form);

            userController.addAvatar(formData);
          },
        },
      },
    );
  }

  render() {
    return this.compile(template, this.props);
  }
}
