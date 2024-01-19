import { UserData } from '../api/user.ts';
import { Message } from '../controllers/messages-controller.ts';
import Block from './block.ts';
import { EventBus } from './event-bus.ts';
import { set, isEqual } from './helpers.ts';

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

export interface ChatData {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: {
    user: UserData;
    time: string;
    content: string;
  };
}

interface StoreData {
  currentUser?: User;
  chats?: ChatData[];
  users?: Omit<User, 'phone' | 'email'>;
  messages?: Record<number, Message[]>;
}

class Store extends EventBus {
  private state: StoreData = {};

  public getState() {
    return this.state;
  }

  public set(path: string, value: unknown) {
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

            if (!isEqual(state, newState) || 'messages' in newState) {
              this.setProps({
                ...newState,
              });

              this.initChildren();
              this.init();

              state = newState;
            }
          });
        }
      };
    };

export default store;
