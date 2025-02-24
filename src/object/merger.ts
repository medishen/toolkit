import { isArray, isNil, isObject } from '../guards';

export class Merger<T extends object> {
  private target: T | any;

  constructor(initialValue: T) {
    if (!isObject(initialValue)) {
      throw new TypeError('Merger constructor expects an object as the initial value.');
    }
    this.target = initialValue;
  }

  merge<U extends object>(source: U): this {
    this.target = this.deepMerge(this.target, source);
    return this;
  }

  get value(): any {
    return this.target;
  }

  private deepMerge<T extends object, U extends object>(target: T, source: U): T | U {
    if (isNil(source)) return target;
    if (!isObject(source) && !isArray(source)) return source;

    const targetIsArray = isArray(target);
    const sourceIsArray = isArray(source);
    if (targetIsArray !== sourceIsArray) {
      throw new TypeError(`Merge error: Cannot merge ${targetIsArray ? 'array' : 'object'} with ${sourceIsArray ? 'array' : 'object'}.`);
    }

    if (targetIsArray && sourceIsArray) {
      return this.mergeArrays(target as any[], source as any[]);
    }

    if (isObject(source) && isObject(target)) {
      return this.mergeObjects(target, source);
    }

    return source;
  }

  private mergeArrays<T extends object, U extends object>(target: T[], source: U[]): T {
    const maxLength = Math.max(target.length, source.length);
    return Array.from(
      { length: maxLength },
      (_, i) => (i < source.length && source[i] !== undefined ? this.deepMerge(i < target.length ? target[i] : (undefined as any), source[i]) : target[i]), // Preserve target value if source[i] is undefined
    ) as T;
  }

  private mergeObjects<T extends object, U extends object>(target: T, source: U): T {
    const merged = { ...target };

    for (const key of Object.keys(source)) {
      const targetValue = target[key];
      const sourceValue = source[key];

      merged[key] = this.deepMerge(targetValue, sourceValue);
    }

    return merged;
  }
}
