import { Constructor, Primitive, PrimitiveObject, TypeGuardMap } from '../common';

export const TypeGuards: TypeGuardMap = {
  // Primitives
  string: (v): v is string => typeof v === 'string',
  number: (v): v is number => typeof v === 'number' && !Number.isNaN(v),
  boolean: (v): v is boolean => typeof v === 'boolean',
  symbol: (v): v is symbol => typeof v === 'symbol',
  null: (v): v is null => v === null,
  undefined: (v): v is undefined => v === undefined,
  bigint: (v): v is bigint => typeof v === 'bigint',

  // Special numbers
  nan: (v) => Number.isNaN(v),
  infinity: (v) => typeof v === 'number' && !Number.isFinite(v) && !Number.isNaN(v),
  integer: (v): v is number => Number.isInteger(v as number),
  float: (v): v is number => typeof v === 'number' && v % 1 !== 0,
  'safe-integer': (v): v is number => Number.isSafeInteger(v as number),

  // Structural types
  function: (v): v is Function => typeof v === 'function',
  object: (v): v is object => typeof v === 'object' && v !== null,
  array: (v): v is unknown[] => Array.isArray(v),
  date: (v): v is Date => v instanceof Date,
  promise: (v): v is Promise<unknown> => v instanceof Promise || (typeof v === 'object' && v !== null && 'then' in v && 'catch' in v),
  regexp: (v): v is RegExp => v instanceof RegExp,
  error: (v): v is Error => v instanceof Error,
  constructor: (v): v is Constructor => typeof v === 'function' && (v.prototype?.constructor === v || Object.getOwnPropertyDescriptor(v, 'prototype')?.writable === false),

  // Collections
  map: (v): v is Map<unknown, unknown> => v instanceof Map,
  set: (v): v is Set<unknown> => v instanceof Set,
  weakmap: (v): v is WeakMap<object, unknown> => v instanceof WeakMap,
  weakset: (v): v is WeakSet<object> => v instanceof WeakSet,
  arraybuffer: (v): v is ArrayBuffer => v instanceof ArrayBuffer,

  // Utility checks
  nil: (v): v is null | undefined => v == null,
  empty: (v): boolean => {
    if (v == null) return true;
    if (TypeGuards.array(v)) return v.length === 0;
    if (TypeGuards.string(v)) return v.trim().length === 0;
    if (TypeGuards.object(v)) return Object.keys(v).length === 0;
    return false;
  },
  truthy: <T>(v: T | null | undefined | 0 | '' | false): v is T => !!v,
};

// Primitive type guards
export const isString = TypeGuards.string;
export const isNumber = TypeGuards.number;
export const isBoolean = TypeGuards.boolean;
export const isSymbol = TypeGuards.symbol;
export const isNull = TypeGuards.null;
export const isUndefined = TypeGuards.undefined;
export const isBigInt = TypeGuards.bigint;

// Special number guards
export const isNaNValue = TypeGuards.nan;
export const isInfinity = TypeGuards.infinity;
export const isInteger = TypeGuards.integer;
export const isFloat = TypeGuards.float;
export const isSafeInteger = TypeGuards['safe-integer'];

// Structural type guards
export const isFunction = TypeGuards.function;
export const isObject = TypeGuards.object;
export const isArray = TypeGuards.array;
export const isDate = TypeGuards.date;
export const isPromise = TypeGuards.promise;
export const isRegExp = TypeGuards.regexp;
export const isError = TypeGuards.error;
export const isConstructor = TypeGuards.constructor;

// Collection guards
export const isMap = TypeGuards.map;
export const isSet = TypeGuards.set;
export const isWeakMap = TypeGuards.weakmap;
export const isWeakSet = TypeGuards.weakset;
export const isArrayBuffer = TypeGuards.arraybuffer;

// Utility guards
export const isNil = TypeGuards.nil;
export const isEmpty = TypeGuards.empty;
export const isTruthy = TypeGuards.truthy;
export const isFalsy = <T>(v: T | null | undefined | 0 | '' | false): v is null | undefined | 0 | '' | false => !isTruthy(v);

export const isPrimitive = (v: unknown): v is Primitive => ['string', 'number', 'boolean', 'symbol', 'undefined', 'bigint'].some((t) => typeof v === t) || v === null;

export const isPrimitiveObject = (v: unknown): v is PrimitiveObject => v instanceof String || v instanceof Number || v instanceof Boolean || v instanceof Symbol || v instanceof BigInt;

export const isPlainObject = (v: unknown): v is Record<string, unknown> => {
  if (!isObject(v)) return false;
  const proto = Object.getPrototypeOf(v);
  return proto === null || proto === Object.prototype;
};

export const isIterable = <T = unknown>(v: unknown): v is Iterable<T> => v != null && typeof (v as any)[Symbol.iterator] === 'function';

export const isAsyncIterable = <T = unknown>(v: unknown): v is AsyncIterable<T> => v != null && typeof (v as any)[Symbol.asyncIterator] === 'function';

export const isThenable = <T = unknown>(v: unknown): v is PromiseLike<T> => v != null && typeof (v as any).then === 'function';
