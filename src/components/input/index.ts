import Block from '../../utils/block';
import store, { StoreEvents, User } from '../../utils/store';
import { validation } from '../../utils/validation';
import template from './index.pug';

interface InputProps {
  type: 'email' | 'text' | 'tel' | 'email' | 'password';
  placeholder?: string;
  name: string;
  value?: string;
  message?: string;
  onChange?: () => void;
  events?: {
    change?: () => void;
    focusout?: () => void;
  };
}

export class Input extends Block {
  constructor(props: InputProps) {
    super(
      { tagName: 'div', className: 'input' },
      {
        ...props,
        events: {
          ...props.events,
          change: props.onChange,
          focusout: () => {
            const elem = this.getContent();
            const input = elem!.querySelector('input');
            const message = validation(elem!).message;
            this.setProps({
              value: input!.value,
              message: message,
            });
          },
        },
      },
    );
    store.on(StoreEvents.Updated, () => {
      if (props.name && props.name in store.getState().currentUser!) {
        this.setProps({
          value: store.getState().currentUser![props.name as keyof User],
        });
      }
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
