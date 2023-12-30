import Block from '../../utils/block';
import store, { StoreEvents, User } from '../../utils/store';
import template from './index.pug';

interface InfoProps {
  label: string;
  text: string;
  name?: keyof User;
}

export class Info extends Block {
  constructor(props: InfoProps) {
    super(
      { tagName: 'div', className: 'info' },
      {
        ...props,
      },
    );
    store.on(StoreEvents.Updated, () => {
      if (props.name) {
        this.setProps({ text: store.getState().currentUser![props.name] });
      }
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
