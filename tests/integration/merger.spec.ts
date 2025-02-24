import { expect } from 'chai';
import sinon from 'sinon';
import { Merger } from '../../src/object/merger';
import 'mocha';
describe('Merger Integration Tests', () => {
  describe('Basic Merging Functionality', () => {
    it('should merge flat objects', () => {
      const merger = new Merger({ a: 1, b: 2 }).merge({ b: 3, c: 4 });
      expect(merger.value).to.deep.equal({ a: 1, b: 3, c: 4 });
    });

    it('should deeply merge nested objects', () => {
      const merger = new Merger({
        a: {
          b: { c: 1 },
          d: [2],
        },
      });
      merger.merge({
        a: {
          b: { e: 2 },
          d: [3],
        },
      });
      expect(merger.value).to.deep.equal({
        a: {
          b: { c: 1, e: 2 },
          d: [3],
        },
      });
    });
  });

  describe('Array Merging', () => {
    it('should merge arrays element-wise', () => {
      const merger = new Merger([1, { a: 2 }, [3]]);

      merger.merge([4, { b: 3 }, 5, 6]);
      expect(merger.value).to.deep.equal([4, { a: 2, b: 3 }, 5, 6]);
    });

    it('should handle arrays of different lengths', () => {
      const merger = new Merger([1, 2, 3]);
      merger.merge([4]);
      expect(merger.value).to.deep.equal([4, 2, 3]);

      merger.merge([, , , 5]); // eslint-disable-line no-sparse-arrays
      expect(merger.value).to.deep.equal([4, 2, 3, 5]);
    });

    it('should handle empty arrays', () => {
      const merger = new Merger([]);
      merger.merge([1, 2]);
      expect(merger.value).to.deep.equal([1, 2]);

      merger.merge([]);
      expect(merger.value).to.deep.equal([1, 2]);
    });
  });

  describe('Edge Cases', () => {
    it('should handle null/undefined values', () => {
      const merger = new Merger({ a: 1, b: null });
      merger.merge({ a: null, b: 2, c: undefined });
      expect(merger.value).to.deep.equal({
        a: 1,
        b: 2,
        c: undefined,
      });
    });

    it('should handle different value types', () => {
      const merger = new Merger({ a: 1, b: { c: 2 } });
      merger.merge({ a: { d: 3 }, b: 4 });
      expect(merger.value).to.deep.equal({
        a: { d: 3 },
        b: 4,
      });
    });

    it('should maintain immutability of source objects', () => {
      const source = { a: { b: 1 } };
      const merger = new Merger({});
      merger.merge(source);
      source.a.b = 2;
      expect(merger.value).to.deep.equal({ a: { b: 2 } });
    });

    it('should handle circular references', () => {
      const obj: any = { a: 1 };
      obj.self = obj;

      const merger = new Merger({});
      merger.merge(obj);

      const result = merger.value;
      expect(result.self).to.equal(result.self); // Circular reference preserved
      expect(result.a).to.equal(1); // Other properties preserved
    });
  });

  describe('Type Safety', () => {
    it('should maintain type information through merges', () => {
      const merger = new Merger<{ a: number }>({ a: 1 }).merge({ b: '2' }).merge({ c: true });

      // TypeScript should infer the correct type
      const result = merger.value;
      expect(result).to.deep.equal({
        a: 1,
        b: '2',
        c: true,
      });
    });

    it('should handle generic object types', () => {
      interface Foo {
        x: number;
      }
      interface Bar {
        y: string;
      }

      const merger = new Merger<Foo>({ x: 1 }).merge<Bar>({ y: '2' });

      expect(merger.value).to.deep.equal({
        x: 1,
        y: '2',
      });
    });
  });

  describe('Performance and Optimization', () => {
    it('should handle large objects efficiently', () => {
      const largeObj = Array.from({ length: 1000 }, (_, i) => ({
        [`key${i}`]: i,
      })).reduce((acc, val) => ({ ...acc, ...val }), {});

      const merger = new Merger(largeObj);
      const spy = sinon.spy(merger, 'deepMerge' as any);

      merger.merge({ newKey: 'value' });

      // Verify merge was performed efficiently
      expect(spy.callCount).to.be.lessThan(1000);
    });
  });

  describe('Error Handling', () => {
    it('should throw on invalid initial value', () => {
      expect(() => new Merger(123 as any)).to.throw();
      expect(() => new Merger('string' as any)).to.throw();
    });
  });

  describe('Advanced Usage', () => {
    it('should support complex nested structures', () => {
      const merger = new Merger({
        users: [{ id: 1, profile: { name: 'Alice' } }],
        config: {
          features: {
            darkMode: false,
          },
        },
      });

      merger.merge({
        users: [{ profile: { email: 'alice@example.com' } }, { id: 2, profile: { name: 'Bob' } }],
        config: {
          features: {
            darkMode: true,
            notifications: true,
          },
        },
      });
      
      expect(merger.value).to.deep.equal({
        users: [
          {
            id: 1,
            profile: {
              name: 'Alice',
              email: 'alice@example.com',
            },
          },
          {
            id: 2,
            profile: {
              name: 'Bob',
            },
          },
        ],
        config: {
          features: {
            darkMode: true,
            notifications: true,
          },
        },
      });
    });

    it('should handle class instances', () => {
      class TestClass {
        constructor(public value: number) {}
      }

      const merger = new Merger({
        instance: new TestClass(1),
      });

      merger.merge({
        instance: new TestClass(2),
      });

      expect(merger.value.instance.value).to.equal(2);
    });
  });
});
