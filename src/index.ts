/**
 * @package @medishn/toolkit
 */

import { ObjectInspector, Merger } from './object';

/**
 * Creates an ObjectInspector for safe, chainable object exploration and manipulation
 *
 * @function
 * @template T - Type of object being inspected
 * @param {T} obj - The object to inspect
 * @returns {ObjectInspector<T>} Chainable inspector instance
 *
 * @example
 * // Basic usage
 * const user = inspect({
 *   name: 'John',
 *   profile: { email: 'john@example.com' }
 * });
 *
 * // Chainable inspection
 * const email = user
 *   .to('profile')
 *   .get('email'); // 'john@example.com'
 *
 * @example
 * // Advanced transformation
 * inspect(data)
 *   .filter((val, key) => key.startsWith('temp_'))
 *
 * @see {@link https://github.com/medishen/toolkit/blob/main/docs/api/inspect.doc.md} For full API documentation
 */
export function inspect<T extends object>(obj: T) {
  return new ObjectInspector(obj);
}

/**
 * Comprehensive type validation utilities for runtime type checking.
 * Provides 40+ type guards covering JavaScript primitives, structural types,
 * collections.
 *
 * @example
 * import { isString } from '@medishn/toolkit';
 *
 * if (isString(value)) {
 *   console.log('Value is a string:', value.trim());
 * }
 *
 * @see {@link https://github.com/medishen/toolkit/blob/main/docs/api/type-guard.doc.md} For full API documentation
 */
export * from './common/types/guard.types';
export * from './guards';

/**
 * Logger - A comprehensive logging utility for professional applications.
 *
 * Provides colorized, structured logging with support for multiple log levels
 * (`info`, `warn`, `error`, `debug`, and `verbose`) and various output formats
 * (e.g., basic, JSON, key-value). Designed for clarity and ease-of-use in both
 * development and production environments.
 *
 * @class Logger
 *
 * @param {string} [context="Application"] - The context or module name that prefixes log messages.
 *
 * @example
 * // Basic usage with default settings:
 * const logger = new Logger();
 * logger.info('Server started', { port: 3000 });
 *
 * @see {@link https://github.com/medishen/toolkit/blob/main/docs/api/logger.doc.md} For full API documentation
 */
export { Logger } from './logger';

/**
 * Error Handling - Comprehensive utilities for robust error management.
 *
 * Provides a complete set of HTTP exception classes and utilities for
 * standardized error handling across applications. Includes RFC 7807
 * Problem Details format compliance and pre-defined exceptions for
 * all standard HTTP status codes.
 *
 * @example
 * // Basic usage:
 * throw new NotFoundException({
 *   detail: 'User not found',
 *   instance: '/users/123'
 * });
 *
 * @example
 * // Custom error with extensions:
 * throw new HttpException.create(HttpStatus.BAD_REQUEST, 'Invalid input', {
 *   validationErrors: [
 *     { field: 'email', message: 'Must be valid email' }
 *   ]
 * });
 *
 * @see {@link https://github.com/medishen/toolkit/blob/main/docs/api/http-exception.doc.md} For full API documentation
 */
export * from './error';

/**
 * Deeply merges two objects while preserving type-safety.
 *
 * This function recursively merges properties from the `source` object into the `base`
 * object. The merged object is returned with a combined type representing the union of both.
 * Note that the function returns a new object reflecting all merged changes.
 *
 * @function
 * @template T - Type of the base object.
 * @template U - Type of the source object.
 * @param {T} base - The base object.
 * @param {U} source - The object to merge into the base.
 * @returns {Merge<T, U>} The deeply merged object.
 *
 * @example
 * const base = { a: 1, b: { c: 2 } };
 * const source = { b: { d: 3 } };
 * const result = merge(base, source);
 * // result has type { a: number; b: { c: number; d: number } }
 *
 * @see {@link https://github.com/medishen/toolkit/blob/main/docs/api/merge.doc.md} For full API documentation
 */
export function merge<T extends object, U extends object>(base: T, source: U) {
  return new Merger(base).merge(source);
}

/**
 * Standard HTTP status code enumeration.
 *
 * Provides named constants for all HTTP status codes (1xx-5xx) with
 * human-readable names. Maintains compatibility with RFC 7231 and RFC 7235.
 *
 * @example
 * import { HttpStatus } from '@medishen/toolkit';
 *
 * // Basic usage
 * res.status(HttpStatus.OK);
 * if (error.status === HttpStatus.NOT_FOUND) {
 *   // Handle 404 error
 * }
 *
 * @see {@link https://tools.ietf.org/html/rfc7231} HTTP/1.1 Semantics
 * @see {@link https://tools.ietf.org/html/rfc7235} HTTP/1.1 Authentication
 * @see {@link https://github.com/medishen/toolkit/blob/main/docs/api/utils.doc.md} For full API documentation
 */
export { HttpStatus } from './common/enum';

/**
 * Core type utilities for TypeScript development.
 *
 * Collection of essential type helpers for common programming patterns:
 * - Nullable value handling (Maybe<T>)
 * - Object dictionary types (Dictionary<T>)
 * - Class constructor types (Constructor<T>)
 * - Primitive value utilities
 * - Type safety helpers
 *
 * @example
 * import type { Maybe, Dictionary } from '@medishen/toolkit';
 *
 * // Optional user data
 * type UserResponse = Dictionary<Maybe<string>>;
 *
 * // Class factory pattern
 * function create<T>(ctor: Constructor<T>): T {
 *   return new ctor();
 * }
 *
 * @see {@link https://www.typescriptlang.org/docs/handbook/utility-types.html} TypeScript Built-in Utilities
 * @see {@link https://github.com/medishen/toolkit/blob/main/docs/api/utils.doc.md} For full API documentation
 */
export * from './common/types/common.types';
