import AuthController from '../controllers/auth-controller.ts';
import chatsController from '../controllers/chats-controller.ts';
import Block from './block.ts';
import { Route } from './route.ts';

export class Router {
  private static __instance?: Router;

  private _currentRoute: Route | null;

  private _rootQuery?: string;

  private _routes: Route[];

  private _history: History;

  constructor(rootQuery?: string) {
    this._routes = [];
    this._history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    if (Router.__instance) {
      return Router.__instance;
    }

    Router.__instance = this;
  }

  use(pathname: string, block: typeof Block) {
    const route = new Route(pathname, block, {
      rootQuery: this._rootQuery || '#app',
    });
    this._routes.push(route);
    return this;
  }

  start() {
    window.onpopstate = (() => {
      this._onRoute(window.location.pathname);
    }).bind(this);

    this._onRoute(window.location.pathname);
  }

  async _onRoute(pathname: string) {
    let route = this.getRoute(pathname);

    if (!route) {
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route!;

    if (!['/', '/sign-up', '/404', '/500'].find((el) => el === pathname)) {
      AuthController.getUser()
        .then(() => {
          if (pathname === '/messenger') {
            chatsController.getChats().then(() => route!.render());
          } else {
            route!.render();
          }
        })
        .catch(() => {
          route = this.getRoute('/');
          window.location.pathname = '/';
          this._currentRoute!.leave();
          this._currentRoute = route!;

          route!.render();
        });
    } else {
      route!.render();
    }
  }

  go(pathname: string) {
    this._history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back() {
    this._history.back();
  }

  forward() {
    this._history.forward();
  }

  reset() {
    delete Router.__instance;

    new Router(this._rootQuery);
  }

  getRoute(pathname: string) {
    const route = this._routes.find((el) => el.match(pathname));
    if (route) {
      return route;
    } else {
      window.location.pathname = '/404';
      return this._routes.find((el) => el.match('/404'));
    }
  }
}
