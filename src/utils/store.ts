import Block from './block';
import { EventBus } from './event-bus';
import { set, isEqual } from './helpers';

export enum StoreEvents {
  Updated = 'updated',
}

export interface User {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
}

interface StoreData {
  currentUser?: User;
}

class Store extends EventBus {
  private state: StoreData = {};

  public getState() {
    return this.state;
  }

  public set(path: keyof StoreData, value: unknown) {
    set(this.state, path, value);

    this.emit(StoreEvents.Updated);
  }
}

const store = new Store();

export const withStore =
  (mapStateToProps: (state: StoreData) => Record<string, unknown>) =>
  (Component: typeof Block) => {
    let state: any;

    return class extends Component {
      constructor(props: any) {
        state = mapStateToProps(store.getState());

        super({ ...props, ...state });

        store.on(StoreEvents.Updated, () => {
          const newState = mapStateToProps(store.getState());

          if (!isEqual(state, newState)) {
            this.setProps({
              ...state,
              ...newState,
            });
          }
        });
      }
    };
  };

export default store;
