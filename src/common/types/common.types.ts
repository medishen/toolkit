/**
 * Represents a class constructor with generic support
 */
export interface Constructor<T = any> extends Function {
  new (...args: any[]): T;
  prototype: T;
}

/**
 * Represents a value that can be of type T, null, or undefined.
 */
export type Maybe<T> = T | null | undefined;

/**
 * A generic dictionary type with string keys.
 */
export type Dictionary<T = unknown> = Record<string, T>;

/**
 * A union type representing numbers or bigints.
 */
export type Numeric = number | bigint;

/**
 * A union type for primitive wrapper objects.
 */

export type PrimitiveObject = String | Number | Boolean | Symbol | BigInt;

/**
 * Basic primitive value types in JavaScript
 */
export type Primitive = string | number | boolean | symbol | null | undefined | bigint;

/**
 * Represents a function that does nothing.
 */
export type Noop = () => void;

/**
 * A generic callback type.
 */
export type Callback<Args extends any[] = any[]> = (...args: Args) => void;

/**
 * Represents a type where all properties are nullable.
 */
export type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

/**
 * Represents a type that excludes null from T.
 */
export type NonNull<T> = T extends null ? never : T;
/**
 * Represents a type that excludes undefined from T.
 */
export type NonUndefined<T> = T extends undefined ? never : T;

/**
 * Represents a type that excludes null and undefined from T.
 */
export type NonNullable<T> = T extends NonNull<T> | NonUndefined<T> ? never : T;
