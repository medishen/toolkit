# Changelog

All notable changes to the `@medishn/toolkit` package will be documented in this file.

---

## [1.0.0] - 2025-02-24

### **Added**

- **Core Utilities**

  - Introduced `ObjectInspector` for type-safe, chainable object inspection and manipulation.
  - Added `Merger` class for deep object merging with type safety.
  - Implemented `inspect` and `merge` utility functions for streamlined object operations.

- **Type Utilities**

  - Added essential type helpers:
    - `Maybe<T>` for nullable values.
    - `Dictionary<T>` for key-value object structures.
    - `Constructor<T>` for class constructor types.
    - `Primitive` and `PrimitiveObject` for primitive value handling.
    - `Nullable<T>`, `NonNull<T>`, `NonUndefined<T>`, and `NonNullable<T>` for type safety.
  - Included utility types: `Noop`, `Callback`, and `Numeric`.

- **Logger**

  - Introduced `Logger` class with support for multiple log levels (`info`, `warn`, `error`, `debug`, `verbose`).
  - Added colorized output for development environments.
  - Implemented context-based logging and customizable log formats.

- **Error Handling**

  - Added comprehensive HTTP exception classes for standardized error handling.
  - Included RFC 7807 Problem Details format compliance.
  - Pre-defined exceptions for all standard HTTP status codes.

- **Type Guards**

  - Added 40+ type guards for runtime type checking:
    - Primitive checks (`isString`, `isNumber`, `isBoolean`, etc.).
    - Structural checks (`isObject`, `isArray`, `isFunction`, etc.).
    - Specialized checks (`isDate`, `isPromise`, `isSymbol`, etc.).

- **HTTP Utilities**

  - Added `HttpStatus` enum with named constants for all HTTP status codes (1xx-5xx).

- **Documentation**
  - Comprehensive API documentation for all utilities.
  - Usage examples and best practices for each feature.

---

### **Documentation**

- Added detailed usage guides for all features.
- Included examples for common use cases.
- Provided migration guides for developers transitioning from similar libraries.

This release marks the stable 1.0.0 version of `@medishn/toolkit`, providing a robust set of utilities for modern TypeScript development. For detailed migration instructions and usage examples, refer to the [official documentation](https://github.com/medishen/toolkit/docs).

## [1.0.1] - 2025-02-24

### **Fix**

- Update Readme
- Update find Module in dist
