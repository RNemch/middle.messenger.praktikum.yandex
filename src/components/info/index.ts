import Block from '../../utils/block.ts';
import store, { StoreEvents, User } from '../../utils/store.ts';
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
