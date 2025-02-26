# @medishn/toolkit Object Inspector API Documentation

## Table of Contents

- [Core Inspection](#core-inspection)
- [Navigation & Type Checking](#navigation--type-checking)
- [Data Transformation](#data-transformation)
- [Structural Operations](#structural-operations)
- [Utility Methods](#utility-methods)
- [Error Handling](#error-handling)
- [Advanced Features](#advanced-features)

---

## Core Inspection

### `inspect<T extends object>(obj: T): ObjectInspector<T>`

Entry point for object inspection chain.

**Example:**

```typescript
import { inspect } from '@medishn/toolkit';

const user = inspect({
  id: 1,
  profile: { email: 'john@example.com' },
});
```

---

## Property Access & Type Narrowing

### `.in<K>(key: K): boolean`

Checks if property exists in the object (including prototype chain).

**Parameters:**

- `key`: Property key to check (string or symbol)

**Returns:**  
`true` if property exists, `false` otherwise

**Example:**

```typescript
const hasEmail = inspect(user).to('profile').in('email'); // true/false
```

**Note:**

- Works with symbol properties:
  ```typescript
  const sym = Symbol('test');
  inspect({ [sym]: 'value' }).in(sym); // true
  ```

---

### `.get<K>(key: K): T[K]`

Retrieves property value with function execution support.

**Parameters:**

- `key`: Property key to access
- `args?`: Arguments if property is a function

**Returns:**  
Property value or function result

**Example:**

```typescript
// Standard access
const name = inspect(user).get('name');

// Function execution
const result = inspect({ multiply: (x: number) => x * 2 }).get('multiply', 3); // 6
```

---

### `.as<U>(guard: (value: T) => value is U): ObjectInspector<U>`

Type assertion with validation.

**Parameters:**

- `guard`: Type guard function

**Returns:**  
New inspector instance with narrowed type

**Throws:**  
`Error` if type assertion fails

**Example:**

```typescript
const dateInspector = inspect(unknownValue).as((v): v is Date => v instanceof Date);

// Usage with custom types
interface AdminUser extends User {
  role: 'admin';
}
const adminInspector = inspect(user).as((u): u is AdminUser => u.role === 'admin');
```

---

### `.when<K, V>(key: K, value: V): this is ObjectInspector<Extract<T, { [P in K]: V }>>`

Type narrowing based on property value equality.

**Parameters:**

- `key`: Property key to check
- `value`: Expected value

**Returns:**  
Type predicate for type narrowing

**Example:**

```typescript
if (user.when('status', 'active')) {
  // Type narrowed to { status: 'active' } & User
  console.log('Active user:', user.value.discountEligible);
}
```

### `.atIndex<N>(index: N): ObjectInspector<T[N]>`

Array element access with bounds checking.

**Throws:**

- `Error` if target not an array
- `Error` for out-of-bounds access

**Example:**

```typescript
const firstItem = inspect([{ value: 1 }, { value: 2 }])
  .atIndex(0)
  .get('value'); // 1
```

### `.is<K>(type: K): Type Guard`

Type checking using registered type validators.

**Example:**

```typescript
if (user.is('object')) {
  // Type narrowed to object
}
```

---

## Data Transformation

### `.map<U>(mapper: (value, key) => U): ObjectInspector<{ [K in T]: U }>`

Type-safe object transformation.

**Features:**

- Automatic circular reference handling
- Symbol key support
- Deep object serialization

**Example:**

```typescript
const transformed = user.map((value, key) => (typeof value === 'number' ? value * 2 : value));
```

### `.filter(predicate: (value, key) => boolean): ObjectInspector<Partial<T>>`

Filter object properties by predicate.

**Example:**

```typescript
const filtered = user.filter((value, key) => key.toString().startsWith('_'));
```

### `.reduce<U>(reducer: (acc, value, key) => U, initial: U): U`

Reduce object to single value.

**Example:**

```typescript
const total = inspect({ a: 1, b: 2 }).reduce((sum, val) => sum + val, 0); // 3
```

---

## Structural Operations

### `.pick<K>(...keys: K[]): ObjectInspector<Pick<T, K>>`

Select specific properties.

**Throws:**

- `Error` if target not plain object

**Example:**

```typescript
const partial = user.pick('id', 'name');
```

### `.omit<K>(...keys: K[]): ObjectInspector<Omit<T, K>>`

Remove specified properties.

**Example:**

```typescript
const sanitized = user.omit('password', 'token');
```

---

## Utility Methods

**Features:**

- Handles cyclic references
- Preserves prototype chain

### `.entries: [string | symbol, any][]`

Get key-value pairs.

### `.keys: Array<string | symbol>`

Get own property keys.

### `.values: any[]`

Get property values.

### `.size: number`

Count own enumerable properties.

---

## Error Handling

### `.or<D>(defaultValue: D): D | this`

Fallback for null/undefined values.

**Example:**

```typescript
const value = inspect(null).or('default'); // 'default'
```

### `.required<K>(key: K): ObjectInspector<T[K]>`

Strict property access.

**Throws:**

- `Error` if property missing
- `Error` if property not object

**Example:**

```typescript
try {
  user.required('invalidKey');
} catch (e) {
  // Handle missing property
}
```

---

## Advanced Features

### Circular Reference Handling

Automatic detection and safe serialization:

```typescript
const circular = inspect({ self: {} });
circular.self = circular.value;

console.log(circular.map((v) => v)); // Handles circular refs safely
```

### Symbol Property Support

Full symbol key lifecycle management:

```typescript
const sym = Symbol('secret');
const obj = inspect({ [sym]: 'value' });

console.log(obj.get(sym)); // 'value'
```

### Type Narrowing

Advanced type assertions:

```typescript
const maybeDate = inspect(someValue).as((v): v is Date => v instanceof Date);
```

### Performance Characteristics

| Operation   | Complexity | Notes                   |
| ----------- | ---------- | ----------------------- |
| `.to()`     | O(1)       | Direct property access  |
| `.map()`    | O(n)       | Iterates all properties |
| `.filter()` | O(n)       | Checks all properties   |
| `.find()`   | O(n)       | Depth-first search      |

---

## Best Practices

1. **Type Safety**

   ```typescript
   // Always type input objects
   inspect<UserType>(userData);
   ```

2. **Error Boundaries**
   ```typescript
   // Use .or() for optional values
   const value = inspect(data).to('optional').or(null);
   ```

---

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Documentation](https://img.shields.io/badge/docs-maintained-brightgreen.svg)](docs/)
[![Contributing](https://img.shields.io/badge/contributions-welcome-blueviolet.svg)](../CONTRIBUTING.md)
