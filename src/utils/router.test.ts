import { expect } from 'chai';
import sinon from 'sinon';
import { Router } from './router.ts';
import Block from './block.ts';

const Route = new Router('#app');

describe('Router', () => {
  global.window.history.back = () => {
    if (typeof window.onpopstate === 'function') {
      window.onpopstate({ currentTarget: window } as unknown as PopStateEvent);
    }
  };

  global.window.history.forward = () => {
    if (typeof window.onpopstate === 'function') {
      window.onpopstate({ currentTarget: window } as unknown as PopStateEvent);
    }
  };

  beforeEach(() => {
    Route.reset();
  });

  const getContentFake = sinon.fake.returns(document.createElement('div'));

  const BlockMock = class {
    getContent = getContentFake;
  } as unknown as typeof Block;

  it('use() should return Router instance', () => {
    const result = Route.use('/', BlockMock);

    expect(result).to.eq(Route);
  });

  describe('back', () => {
    it('should render a page on history back action', () => {
      Route.use('/', BlockMock).start();

      Route.back();

      expect(getContentFake.callCount).to.eq(2);
    });

    it('should render a page on start', () => {
      Route.use('/', BlockMock).start();

      expect(getContentFake.callCount).to.eq(3);
    });
  });

  describe('go', () => {
    it('should instantiate class Block', () => {
      const blockMock = {
        destroy() {},
      };
      const blockFake = sinon.fake.returns(blockMock);
      const router = new Router('app');
      router.use('/', blockFake as any);

      router.go('/');

      expect(blockFake.callCount).to.eq(1);
    });

    it('should change path in browser history', () => {
      const blockMock = {
        destroy() {},
      };
      const blockFake = sinon.fake.returns(blockMock);
      const router = new Router('app');
      router.use('/sign-up', blockFake as any);

      router.go('/sign-up');

      expect(window.location.pathname).to.eq('/sign-up');
    });
  });
});
