/**
 * Represents a class constructor with generic support
 */
export interface Constructor<T = any> extends Function {
  new (...args: any[]): T;
  prototype: T;
}

/**
 * Basic primitive value types in JavaScript
 */
export type Primitive = string | number | boolean | symbol | null | undefined | bigint;

/**
 * Special number cases that need explicit checks
 */
export type SpecialNumber = 'nan' | 'infinity' | 'integer' | 'float' | 'safe-integer';

/**
 *  object types
 */
export type StructuralType = 'function' | 'object' | 'array' | 'date' | 'promise' | 'regexp' | 'error' | 'constructor';

/**
 * collection types
 */
export type CollectionType = 'map' | 'set' | 'weakmap' | 'weakset' | 'arraybuffer';

/**
 * Node.js specific types 
 */
export type NodeJSType = 'promise';

/**
 * Extended type categories for practical checks
 */
export type ExtendedType = Primitive | SpecialNumber | StructuralType | CollectionType | NodeJSType | 'nil' | 'empty' | 'truthy' | 'falsy';

/* ==================== *
 *  TYPE GUARDING MAP   *
 * ==================== */
export interface TypeGuardMap {
  // Primitive checks
  string: (v: unknown) => v is string;
  number: (v: unknown) => v is number;
  boolean: (v: unknown) => v is boolean;
  symbol: (v: unknown) => v is symbol;
  null: (v: unknown) => v is null;
  undefined: (v: unknown) => v is undefined;
  bigint: (v: unknown) => v is bigint;

  // Special number checks
  nan: (v: unknown) => boolean;
  infinity: (v: unknown) => boolean;
  integer: (v: unknown) => v is number;
  float: (v: unknown) => v is number;
  'safe-integer': (v: unknown) => v is number;

  // Structural checks
  function: (v: unknown) => v is Function;
  object: (v: unknown) => v is object;
  array: (v: unknown) => v is unknown[];
  date: (v: unknown) => v is Date;
  promise: (v: unknown) => v is Promise<unknown>;
  regexp: (v: unknown) => v is RegExp;
  error: (v: unknown) => v is Error;
  constructor: (v: unknown) => v is Constructor;

  // Collection checks
  map: (v: unknown) => v is Map<unknown, unknown>;
  set: (v: unknown) => v is Set<unknown>;
  weakmap: (v: unknown) => v is WeakMap<object, unknown>;
  weakset: (v: unknown) => v is WeakSet<object>;
  arraybuffer: (v: unknown) => v is ArrayBuffer;

  // Utility checks
  nil: (v: unknown) => v is null | undefined;
  empty: (v: unknown) => boolean;
  truthy: <T>(v: T | null | undefined | 0 | '' | false) => v is T;
}
