# @medishn/toolkit Type Guards API Documentation

## Overview

The type guards module provides comprehensive runtime type validation utilities for JavaScript/TypeScript applications.

```ts
import { isString, isDate, isEmpty } from '@medishn/toolkit';
```

## API Reference

### Primitive Type Guards

| Guard         | Description                             | Example                            |
| ------------- | --------------------------------------- | ---------------------------------- |
| `isString`    | Validates string primitives             | `isString('text') → true`          |
| `isNumber`    | Checks for valid numbers (excludes NaN) | `isNumber(42) → true`              |
| `isBoolean`   | Strict boolean check                    | `isBoolean(false) → true`          |
| `isSymbol`    | Symbol type validation                  | `isSymbol(Symbol.iterator) → true` |
| `isNull`      | Null value check                        | `isNull(null) → true`              |
| `isUndefined` | Undefined check                         | `isUndefined(undefined) → true`    |
| `isBigInt`    | BigInt type validation                  | `isBigInt(10n) → true`             |

```ts
if (isString(input)) {
  // input is narrowed to string
  console.log(input.toUpperCase());
}
```

### Special Number Checks

| Guard           | Description                   | Example                         |
| --------------- | ----------------------------- | ------------------------------- |
| `isNaNValue`    | Detects NaN values            | `isNaNValue(NaN) → true`        |
| `isInfinity`    | Infinity/-Infinity check      | `isInfinity(1/0) → true`        |
| `isInteger`     | Validates whole numbers       | `isInteger(42) → true`          |
| `isFloat`       | Floating point check          | `isFloat(3.14) → true`          |
| `isSafeInteger` | Safe integer range validation | `isSafeInteger(2^53 -1) → true` |

### Structural Type Guards

| Guard           | Description                       | Example                           |
| --------------- | --------------------------------- | --------------------------------- |
| `isFunction`    | Function type check               | `isFunction(() => {}) → true`     |
| `isObject`      | Object validation (excludes null) | `isObject({}) → true`             |
| `isArray`       | Array instance check              | `isArray([]) → true`              |
| `isDate`        | Valid Date instances              | `isDate(new Date()) → true`       |
| `isPromise`     | Promise/A+ compatible checks      | `isPromise(fetch()) → true`       |
| `isRegExp`      | RegExp validation                 | `isRegExp(/pattern/) → true`      |
| `isError`       | Error instance check              | `isError(new Error()) → true`     |
| `isConstructor` | Class constructor validation      | `isConstructor(class C{}) → true` |

### Collection Guards

| Guard           | Description            | Example                                    |
| --------------- | ---------------------- | ------------------------------------------ |
| `isMap`         | Map instance check     | `isMap(new Map()) → true`                  |
| `isSet`         | Set validation         | `isSet(new Set()) → true`                  |
| `isWeakMap`     | WeakMap instance check | `isWeakMap(new WeakMap()) → true`          |
| `isWeakSet`     | WeakSet validation     | `isWeakSet(new WeakSet()) → true`          |
| `isArrayBuffer` | ArrayBuffer check      | `isArrayBuffer(new ArrayBuffer(8)) → true` |

### Utility Guards

| Guard             | Description                   | Example                              |
| ----------------- | ----------------------------- | ------------------------------------ |
| `isNil`           | Null/undefined check          | `isNil(null) → true`                 |
| `isEmpty`         | Empty value detection         | `isEmpty([]) → true`                 |
| `isTruthy`        | Truthy value check            | `isTruthy('a') → true`               |
| `isFalsy`         | Falsy value validation        | `isFalsy(0) → true`                  |
| `isPrimitive`     | Primitive type check          | `isPrimitive('text') → true`         |
| `isPlainObject`   | Plain object validation       | `isPlainObject({}) → true`           |
| `isIterable`      | Iterable protocol check       | `isIterable([]) → true`              |
| `isAsyncIterable` | Async iterable check          | `isAsyncIterable(readStream) → true` |
| `isThenable`      | Thenable (promise-like) check | `isThenable({ then: fn }) → true`    |

## Usage Examples

### Basic Type Validation

```ts
import { isString, isDate } from '@medishn/toolkit';

function parseInput(input: unknown) {
  if (isString(input)) {
    return input.trim();
  }

  if (isDate(input)) {
    return input.toISOString();
  }

  throw new Error('Invalid input type');
}
```

### API Response Validation

```ts
import { isObject, isArray, isNumber } from '@medishn/toolkit';

function validateApiResponse(response: unknown) {
  return isObject(response) && isArray(response.items) && response.items.every(isNumber);
}
```

### Empty State Handling

```ts
import { isEmpty } from '@medishn/toolkit';

function handleData(data: unknown) {
  if (isEmpty(data)) {
    return fetchDefaultData();
  }
  return processData(data);
}
```

## Type Narrowing

All guards provide TypeScript type narrowing:

```ts
function process(value: unknown) {
  if (isDate(value)) {
    // value is Date here
    console.log(value.getFullYear());
  }

  if (isMap(value)) {
    // value is Map here
    console.log(value.size);
  }
}
```
