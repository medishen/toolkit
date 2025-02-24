import { expect } from 'chai';
import sinon from 'sinon';
import { ObjectInspector } from '../../src/object/object-inspector';
import 'mocha';
describe('ObjectInspector', () => {
  let clock: sinon.SinonFakeTimers;

  before(() => {
    clock = sinon.useFakeTimers(new Date(2023, 0, 1).getTime());
  });

  after(() => {
    clock.restore();
  });

  describe('Core Functionality', () => {
    const testObj = {
      name: 'test',
      nested: {
        value: 42,
        arr: [{ id: 1 }, { id: 2 }],
        nullish: null,
        date: new Date(),
      },
      [Symbol.iterator]: 'iterator',
      func: (multiplier: number) => 42 * multiplier,
    };

    it('should verify property existence', () => {
      const inspector = new ObjectInspector(testObj);
      expect(inspector.in('name')).to.be.true;
    });
  });

  describe('Nested Navigation', () => {
    const complexObj = {
      level1: {
        level2: {
          level3: {
            value: 'deep',
          },
          arr: [1, { nested: 'value' }, 3],
        },
      },
      nullish: null,
    };

    it('should navigate deep structures', () => {
      const inspector = new ObjectInspector(complexObj)
        .to('level1')
        .to('level2')
        .to('level3');

      expect(inspector.value.value).to.equal('deep');
    });

    it('should handle null/undefined navigation', () => {
      const inspector = new ObjectInspector(complexObj)
        .to('nullish')
        .to('invalid');

      expect(inspector.value).to.be.null;
    });

    it('should handle array navigation', () => {
      const inspector = new ObjectInspector(complexObj)
        .to('level1')
        .to('level2')
        .to('arr')
        .atIndex(1)
        .get('nested');
      expect(inspector).to.equal('value');
    });
  });

  describe('Type Checking', () => {
    it('should validate complex types', () => {
      const dateInspector = new ObjectInspector(new Date());
      expect(dateInspector.is('date')).to.be.true;

      const regexpInspector = new ObjectInspector(/test/);
      expect(regexpInspector.is('regexp')).to.be.true;
    });
  });

  describe('Edge Cases', () => {
    it('should handle circular references', () => {
      const circular: any = { data: null };
      circular.data = circular;

      const inspector = new ObjectInspector(circular);
      const found = inspector.find((v): v is typeof circular => v === circular);

      expect(found).to.be.instanceOf(ObjectInspector);
      expect(found?.value).to.equal(circular);
      expect(() => found?.to('data').value).to.not.throw();
    });

    it('should handle non-object targets', () => {
      const arrayInspector = new ObjectInspector([1, 2, 3]);

      expect(arrayInspector.atIndex(1).value).to.equal(2);
    });
  });

  describe('Error Handling', () => {
    it('should throw on invalid array access', () => {
      const inspector = new ObjectInspector({ arr: [1, 2, 3] });
      expect(() => inspector.to('arr').atIndex(5)).to.throw(
        'Index out of bounds',
      );
    });
  });

  describe('Advanced Operations', () => {
    const userData = {
      id: 1,
      name: 'John',
      profile: {
        email: 'john@example.com',
        preferences: {
          theme: {
            dark: {
              color: {
                black: 'black',
              },
            },
          },
          notifications: true,
        },
      },
      history: [
        { date: new Date(2023, 0, 1), action: 'login' },
        { date: new Date(2023, 0, 2), action: 'logout' },
      ],
    };

    it('should perform complex pick/omit operations', () => {
      const inspector = new ObjectInspector(userData)
        .pick('id', 'profile')
        .omit('profile' as any);

      expect(inspector.value).to.deep.equal({ id: 1 });
    });

    it('should find nested objects', () => {
      const found = new ObjectInspector(userData).find(
        (v): v is { action: string } => typeof (v as any)?.action === 'string',
      );

      expect(found?.value.action).to.equal('login');
    });
  });

  describe('Functional Behavior', () => {
    it('should invoke functions through get', () => {
      const obj = { multiplier: (x: number) => x * 2 };
      const inspector = new ObjectInspector(obj);
      expect(inspector.get('multiplier', 21)).to.equal(42);
    });

    it('should provide fallback with or()', () => {
      const inspector = new ObjectInspector(null as any);
      expect(inspector.or('default')).to.equal('default');
    });
  });
  describe('Object Transformation Methods', () => {
    const sampleData = {
      a: 1,
      b: 2,
      c: 3,
      nested: {
        d: 4,
        e: 5,
      },
      arr: [6, 7, 8],
      empty: {},
      "[Symbol('test')]": 'symbol',
      func: () => 'result',
    };

    describe('map()', () => {
      it('should transform all properties', () => {
        const inspector = new ObjectInspector(sampleData).map(
          (value, key) => `${key}-${String(value)}`,
        );
        expect(inspector.value).to.deep.equal({
          a: 'a-1',
          b: 'b-2',
          c: 'c-3',
          nested: 'nested-[object Object]',
          arr: 'arr-6,7,8',
          empty: 'empty-[object Object]',
          func: "func-() => 'result'",
          "[Symbol('test')]": "[Symbol('test')]-symbol",
        });
      });

      it('should handle empty objects', () => {
        const inspector = new ObjectInspector({}).map(() => 'transformed');

        expect(inspector.isEmpty()).to.be.true;
      });

      it('should handle array target', () => {
        const inspector = new ObjectInspector([1, 2, 3] as any).map((v) => v);
        expect(inspector.value).to.deep.equal({ '0': 1, '1': 2, '2': 3 });
      });
    });

    describe('filter()', () => {
      it('should filter properties based on predicate', () => {
        const inspector = new ObjectInspector(sampleData).filter(
          (val, key) => typeof val === 'number' && val > 2,
        );

        expect(inspector.value).to.deep.equal({
          c: 3,
        });
      });

      it('should return empty object when no matches', () => {
        const inspector = new ObjectInspector(sampleData).filter(() => false);

        expect(inspector.isEmpty()).to.be.true;
      });

      it('should preserve symbol properties when filtered', () => {
        const testSymbol = Symbol('test');
        const sampleData = {
          a: 1,
          b: 2,
          [testSymbol]: 'symbolValue',
        };

        const inspector = new ObjectInspector(sampleData).filter(
          (_, key) => typeof key === 'symbol',
        );

        expect(inspector.value).to.have.all.keys(testSymbol);
        expect(inspector.value[testSymbol]).to.equal('symbolValue');
      });
    });

    describe('reduce()', () => {
      it('should accumulate values correctly', () => {
        const sum = new ObjectInspector(sampleData).reduce(
          (acc, val) => (typeof val === 'number' ? acc + val : acc),
          0,
        );

        expect(sum).to.equal(6); // 1+2+3
      });

      it('should handle empty objects', () => {
        const result = new ObjectInspector({}).reduce(() => {},
        'default' as any);

        expect(result).to.equal('default');
      });

      it('should include all value types in reduction', () => {
        const typeReport = new ObjectInspector(sampleData).reduce(
          (acc, val) => {
            const type = typeof val;
            acc[type] = (acc[type] || 0) + 1;
            return acc;
          },
          {} as Record<string, number>,
        );

        expect(typeReport).to.deep.equal({
          number: 3,
          object: 3,
          function: 1,
          string: 1,
        });
      });
    });

    describe('isEmpty()', () => {
      it('should detect empty objects', () => {
        expect(new ObjectInspector({}).isEmpty()).to.be.true;
        expect(new ObjectInspector({ a: 1 }).isEmpty()).to.be.false;
      });

      it('should consider symbol properties', () => {
        const inspector = new ObjectInspector({ [Symbol()]: 'value' });
        expect(inspector.isEmpty()).to.be.false;
      });
    });

    describe('size', () => {
      it('should count own properties', () => {
        expect(new ObjectInspector(sampleData)).to.have.property('size', 8);
        expect(new ObjectInspector({ a: 1, b: 2 })).to.have.property('size', 2);
      });

      it('should include symbol keys in count', () => {
        const obj = { [Symbol()]: 'value', a: 1 };
        expect(new ObjectInspector(obj)).to.have.property('size', 2);
      });

      it('should throw for non-object targets', () => {
        expect(() => new ObjectInspector(null as any).size).to.throw(
          'Cannot get size of non-object',
        );
      });
    });

    describe('pluck()', () => {
      const user = {
        id: 1,
        name: 'John',
        profile: {
          email: 'john@example.com',
          age: 30,
        },
        meta: {},
      };
    });

    describe('etc Cases', () => {
      it('should handle null prototype objects', () => {
        const obj = Object.create(null);
        obj.a = 1;
        obj.b = 2;

        const inspector = new ObjectInspector(obj).filter(
          (_, key) => key === 'a',
        );

        expect(inspector.value).to.deep.equal({ a: 1 });
      });

      it('should handle frozen objects', () => {
        const frozen = Object.freeze({ a: 1, b: 2 });
        const inspector = new ObjectInspector(frozen).map((v) => v * 2);

        expect(inspector.value).to.deep.equal({ a: 2, b: 4 });
      });

      it('should handle objects with getters', () => {
        const obj = {
          a: 1,
          get computed() {
            return this.a * 2;
          },
        };

        const inspector = new ObjectInspector(obj).map(
          (val, key) => `${key}:${val}`,
        );

        expect(inspector.value).to.deep.equal({
          a: 'a:1',
          computed: 'computed:2',
        });
      });
    });
  });
});
