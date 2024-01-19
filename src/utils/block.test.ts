import sinon from 'sinon';
import esmock from 'esmock';
import { expect } from 'chai';
import BlockType from './block.ts';

const eventBusMock = {
  on: sinon.fake(),
  emit: sinon.fake(),
};

describe('Block', async () => {
  const { default: Block } = (await esmock('./block', {
    './event-bus': {
      EventBus: class {
        emit = eventBusMock.emit;
        on = eventBusMock.on;
      },
    },
  })) as { default: typeof BlockType };

  class TestBlock extends Block<{ test: number }> {
    getProps() {
      return this.props;
    }
    render() {
      return document.createDocumentFragment();
    }
  }
  describe('setProps', () => {
    it('should extend props object with passed object', () => {
      const initialProps = { test: 1 };
      const newProps = { test: 2 };
      const expectedProps = Object.assign(initialProps, newProps);

      const testBlock = new TestBlock(undefined, initialProps);
      testBlock.setProps(newProps);

      expect(JSON.stringify(testBlock.getProps())).to.eq(
        JSON.stringify(expectedProps),
      );
    });
  });
  describe('hide', () => {
    it('hide should add class hidden to the element', () => {
      const testBlock = new TestBlock({ tagName: 'div' }, {});
      testBlock.hide();

      expect(testBlock.getContent()!.style.display).to.eq('none');
    });
  });

  describe('show', () => {
    it('should remove class hidden from the element', () => {
      const testBlock = new TestBlock({ tagName: 'div' }, {});
      testBlock.getContent()!.style.display = 'none';

      testBlock.show();

      expect(testBlock.getContent()!.style.display).to.eq('block');
    });
  });

  describe('init', () => {
    it('should create element with passed tag', () => {
      const testBlock = new TestBlock({ tagName: 'section' }, {});

      expect(testBlock.getContent()!.tagName).to.eq('SECTION');
    });

    it('should add class with passed className', () => {
      const expectedClassName = 'test-class';

      const testBlock = new TestBlock(
        { tagName: 'div', className: expectedClassName },
        {},
      );

      expect(testBlock.getContent()!.className).to.eq(expectedClassName);
    });

    it('should and attributes passed attributes', () => {
      const expectedAttributes = [{ name: 'id', value: 'test' }];

      const testBlock = new TestBlock(
        { tagName: 'div', attributes: expectedAttributes },
        {},
      );

      expect(testBlock.getContent()!.id).to.eq(expectedAttributes[0].value);
    });
  });
});
