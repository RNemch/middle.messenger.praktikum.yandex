import { EventBus } from './event-bus.ts';
import { nanoid } from 'nanoid';

interface IContainer {
  tagName: string;
  className?: string;
  attributes?: { name: string; value: string }[];
}

class Block<Props extends Record<string, any> = any> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  public id: string = nanoid(6);

  protected props: Props;

  protected refs: Record<string, Block> = {};

  public children: Record<string, Block | Block[]>;

  private eventBus: () => EventBus;

  private _element: HTMLElement | null = null;

  private _meta: {
    props: any;
    container?: IContainer;
  };

  /** JSDoc
   * @param {Object} container
   * @param {Object} props
   *
   * @returns {void}
   */
  constructor(
    container?: {
      tagName: string;
      className?: string;
      attributes?: { name: string; value: string }[];
    },
    propsWithChildren: any = {},
  ) {
    const eventBus = new EventBus();

    const { props, children } = this._getChildrenAndProps(propsWithChildren);
    this._meta = {
      props,
      container,
    };

    this.children = children;
    this.props = this._makePropsProxy(props);

    this.initChildren();
    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _getChildrenAndProps(childrenAndProps: any) {
    const props: Record<string, any> = {};
    const children: Record<string, Block | Block[]> = {};

    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if (
        value instanceof Block ||
        (Array.isArray(value) && value.every((item) => item instanceof Block))
      ) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });
    return { props, children };
  }

  _removeEvents() {
    const { events = {} }: any = this.props;

    if (!events || !this._element) {
      return;
    }

    Object.keys(events).forEach((eventName) => {
      this._element!.removeEventListener(eventName, events[eventName]);
    });
  }

  _addEvents() {
    const { events = {} } = this.props as {
      events?: Record<string, () => void>;
    };

    Object.keys(events).forEach((eventName) => {
      this._element?.addEventListener(eventName, events[eventName]);
    });
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  }

  protected initChildren() {}

  private _init() {
    this._element = this._createDocumentElement(this._meta.container);

    this.init();

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  protected init() {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  _componentDidMount() {
    this.componentDidMount();
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidMount() {}

  public dispatchComponentDidMoun() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((ch) => ch.dispatchComponentDidMoun());
      } else {
        child.dispatchComponentDidMoun();
      }
    });
  }

  private _componentDidUpdate() {
    if (this.componentDidUpdate()) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  // Может переопределять пользователь, необязательно трогать
  protected componentDidUpdate() {
    return true;
  }

  setProps = (nextProps: any) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  private _render() {
    const fragment = this.render();
    const element = fragment.firstElementChild;

    if (!element) {
      return;
    }

    this._removeEvents();
    this._element!.innerHTML = '';
    this._element!.append(fragment);

    this._addEvents();
  }

  protected compile(template: (context: any) => string, context: any) {
    const contextAndStubs = { ...context };
    Object.entries(this.children).forEach(([name, component]) => {
      if (Array.isArray(component)) {
        contextAndStubs[name] = component.map(
          (c) => `<div data-id="${c.id}"></div>`,
        );
        return;
      }

      contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
    });
    const html = template(contextAndStubs);
    const temp = document.createElement('template');
    temp.innerHTML = html;

    Object.entries(this.children).forEach(([_, component]) => {
      if (Array.isArray(component)) {
        component.forEach((c) => {
          const stub = temp.content.querySelector(`[data-id="${c.id}"]`);

          if (!stub) {
            return;
          }

          c.getContent()?.append(...Array.from(stub.childNodes));

          stub.replaceWith(c.getContent()!);
        });

        return;
      }
      const stub = temp.content.querySelector(`[data-id="${component.id}"]`);

      if (!stub) {
        return;
      }

      component.getContent()?.append(...Array.from(stub.childNodes));

      stub.replaceWith(component.getContent()!);
    });

    return temp.content;
  }

  // Может переопределять пользователь, необязательно трогать
  render(): DocumentFragment {
    return new DocumentFragment();
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy(props: any) {
    // Можно и так передать this
    // Такой способ больше не применяется с приходом ES6+
    const self = this;

    return new Proxy(props, {
      get(target: any, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target: any, prop: string, value: string) {
        const oldTarget = { ...target };
        target[prop] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    } as any);
  }

  _createDocumentElement(container?: {
    tagName: string;
    className?: string;
    attributes?: { name: string; value: string }[];
  }) {
    const elem = document.createElement(container ? container.tagName : 'div');
    if (container?.className) {
      elem.classList.add(container.className);
    }
    if (container?.attributes) {
      container.attributes.forEach((el) => {
        elem.setAttribute(el.name, el.value);
      });
    }
    return elem;
  }

  show() {
    const content = this.getContent();
    content!.style.display = 'block';
  }

  hide() {
    const content = this.getContent();
    content!.style.display = 'none';
  }
}

export default Block;
