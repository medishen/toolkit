import {
  isFunction,
  isNil,
  isObject,
  isSymbol,
  isUndefined,
  TypeGuards,
} from '../guards';

export class ObjectInspector<T extends object> {
  constructor(private target: T) {}

  get keys() {
    const keys = Object.keys(this.target);
    return Reflect.ownKeys(this.target);
  }

  get values(): any[] {
    return this.keys.map((key) => (this.target as any)[key]);
  }

  get value(): T {
    return this.target;
  }

  get entries(): [string | symbol, any][] {
    return this.keys.map((key) => [key, (this.target as any)[key]]);
  }

  get size(): number {
    if (!this.is('object')) throw new Error('Cannot get size of non-object');
    return this.keys.length;
  }

  in<K extends string & keyof T>(key: K): boolean {
    return key in this.target || !!this.target[key];
  }

  to<K extends string & keyof T>(
    key: K,
  ): ObjectInspector<
    Exclude<T[K], null> extends object ? Exclude<T[K], null> : never
  > {
    const value = this.target && this.target[key];

    if (isNil(value) || !isObject(value)) {
      return new ObjectInspector(null as any);
    }
    return new ObjectInspector(value) as any;
  }

  is<K extends keyof typeof TypeGuards>(
    type: K,
  ): this is ObjectInspector<Extract<T, ReturnType<(typeof TypeGuards)[K]>>> {
    return TypeGuards[type](this.target);
  }

  get<K extends keyof T, V extends (arg: unknown) => unknown>(
    key: K,
    value?: Parameters<V>[0],
  ): T[K] extends V ? ReturnType<V> : T[K] {
    const result = this.target[key];

    if (!isUndefined(result) && isFunction(result)) {
      return result(value);
    }

    return result as T[K] extends V ? ReturnType<V> : T[K];
  }

  atIndex<N extends number>(
    index: N,
  ): ObjectInspector<T extends (infer U extends object)[] ? U : never> {
    if (!Array.isArray(this.target)) throw new Error('Target is not an array');
    if (index >= this.target.length) throw new Error('Index out of bounds');
    const value = this.target[index];
    return new ObjectInspector(value);
  }

  as<U extends T>(guard: (value: T) => value is U): ObjectInspector<U> {
    if (!guard(this.target)) throw new Error('Type assertion failed');
    return new ObjectInspector(this.target as U);
  }

  required<K extends string & keyof T>(
    key: K,
  ): ObjectInspector<
    Exclude<T[K], undefined> extends object ? Exclude<T[K], undefined> : never
  > {
    if (!this.in(key)) {
      throw new Error(`Property ${String(key)} not found`);
    }
    const value = this.target[key];
    if (!isObject(value))
      throw new Error(`Property ${String(key)} is not an object`);
    return new ObjectInspector(
      value as Exclude<T[K], undefined> extends object
        ? Exclude<T[K], undefined>
        : never,
    );
  }

  or<D>(defaultValue: D): D | this {
    return this.target === null ? defaultValue : this;
  }

  when<K extends keyof T, V extends T[K]>(
    key: K,
    value: V,
  ): this is ObjectInspector<Extract<T, { [P in K]: V }>> {
    return this.target[key] === value;
  }

  pick<K extends keyof T>(...keys: K[]): ObjectInspector<Pick<T, K>> {
    if (!this.is('object')) throw Error('Cannot pick from non-object');

    const picked = {} as Pick<T, K>;
    for (const key of keys) {
      if (key in this.target) {
        picked[key] = this.target[key];
      }
    }
    return new ObjectInspector<Pick<T, K>>(picked);
  }

  omit<K extends keyof T>(...keys: K[]): ObjectInspector<Omit<T, K>> {
    if (!this.is('object')) throw Error('Cannot omit from non-object');

    const omitted = this.target as any;
    for (const key of keys) {
      delete omitted[key];
    }
    return new ObjectInspector<Omit<T, K>>(omitted as Omit<T, K>);
  }

  find<U extends object>(
    predicate: (value: unknown) => value is U,
  ): ObjectInspector<U> | undefined {
    const visited = new WeakSet<object>();

    const searchInternal = (obj: unknown): ObjectInspector<U> | undefined => {
      if (isObject(obj)) {
        if (visited.has(obj)) return undefined;
        visited.add(obj);
      }

      if (predicate(obj)) return new ObjectInspector<U>(obj as U);

      if (Array.isArray(obj)) {
        for (const item of obj) {
          const result = searchInternal(item);
          if (result) return result;
        }
      } else if (isObject(obj)) {
        for (const key of Reflect.ownKeys(obj)) {
          const result = searchInternal((obj as any)[key]);
          if (result) return result;
        }
      }

      return undefined;
    };

    return searchInternal(this.target);
  }

  map<U>(
    mapper: (value: any, key: string) => U,
  ): ObjectInspector<{ [K in keyof T]: U }> {
    if (!this.is('object')) throw new Error('Cannot map non-object');

    const result = {} as { [K in keyof T]: U };
    if (Array.isArray(this.target)) {
      for (let i = 0; i < (this.target as any).length; i++) {
        const key = i.toString();
        const rawValue = this.target[i];
        result[key] = mapper(rawValue, key);
      }
    } else {
      for (const key of this.keys) {
        const stringKey = isSymbol(key)
          ? `[${key.toString()}]`
          : key.toString();
        const rawValue = this.target[key];

        result[key] = mapper(rawValue, stringKey!);
      }
    }
    return new ObjectInspector(result);
  }

  filter(
    predicate: (value: any, key: string) => boolean,
  ): ObjectInspector<Partial<T>> {
    if (!this.is('object')) throw new Error('Cannot filter non-object');

    const result = {} as Partial<T>;
    const keys = this.keys;

    for (const key of keys) {
      if (predicate(this.target[key as keyof T], key as any)) {
        result[key as keyof T] = this.target[key as keyof T];
      }
    }
    return new ObjectInspector(result);
  }

  reduce<U>(
    reducer: (acc: U, value: any, key: string) => U,
    initialValue: U,
  ): U {
    if (!this.is('object')) throw new Error('Cannot reduce non-object');

    let result = initialValue;
    for (const key in this.target) {
      result = reducer(result, this.target[key], key);
    }
    return result;
  }
  isEmpty(): boolean {
    if (!this.is('object'))
      throw new Error('Cannot check emptiness of non-object');

    return this.keys.length === 0;
  }

  includes(value: unknown): boolean {
    return this.values.some((v) => v === value);
  }
}