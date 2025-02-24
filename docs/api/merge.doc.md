# @medishn/toolkit Deep Merge Documentation

Welcome to the merge API documentation! This guide explains everything you need to know about how our deep merge utilities work. Whether you’re just curious about what the functions do or you need to integrate them into your project, this doc walks you through it in plain language.

---

## Quick Start 🚀

```typescript
import { merge } from '@medishn/toolkit';

// Basic merge
const base = { a: 1, b: { c: 2 } };
const update = { b: { d: 3 }, e: 4 };

const result = merge(base, update).value;
/* Result:
{
  a: 1,
  b: { c: 2, d: 3 },
  e: 4
}
*/
```

## Key Features ✨

- **Deep merging** - Nested objects? No problem!
- **Type-safe results** - Know exactly what you're getting
- **Array merging** - Combines arrays element-wise
- **Non-destructive** - Original objects stay untouched
- **Undefined handling** - Source undefined? Keeps target value

## Usage Examples 🛠️

### Basic Object Merge

```typescript
const user = { name: 'Alice', settings: { theme: 'dark' } };
const preferences = { settings: { fontSize: 16 } };

merge(user, preferences).value;
/* Returns:
{
  name: 'Alice',
  settings: {
    theme: 'dark',
    fontSize: 16
  }
}
*/
```

### Array Merging

```typescript
const baseArray = [1, { x: 2 }];
const updateArray = [3, { y: 4 }, 5];

merge(baseArray, updateArray).value;
/* Returns:
[3, { x: 2, y: 4 }, 5]
*/
```

### Multiple Merges

```typescript
const config = merge({ a: 1 }, { b: 2 }).merge({ c: 3 }).value;
// { a: 1, b: 2, c: 3 }
```

## Edge Cases 🔍

### Partial Updates

```typescript
merge(
  { a: 1, b: { c: 2, d: 3 } },
  { b: { d: undefined } }, // Keeps original d value
);
// { a: 1, b: { c: 2, d: 3 } }
```

### Mixed Types

```typescript
merge(
  { items: [1, 2] },
  { items: { 0: 3 } }, // catch this!
); // Error: Can't merge array with object
```

### Null Handling

```typescript
merge({ a: null }, { a: 42 }); // { a: 42 }
merge({ a: 42 }, { a: null }); // { a: 42 }
```

## API Reference 📚

### `merge(base, source)`

The main attraction - merges two objects deeply.

**Parameters:**

- `base`: Your starting object (won't be modified)
- `source`: Changes/updates to apply

**Returns:**  
New merged object with combined type

**Methods:**

- `.merge(source)`: Chainable merge operation
- `.value`: Get final merged result

## TypeScript Magic 🔮

**Automatic Type Inference:**

```typescript
// Result type becomes { a: number, b: { c: string, d: boolean } }
merge({ a: 1, b: { c: 'hello' } }, { b: { d: true } });
```

**Type Overrides:**

```typescript
interface Base {
  x: number;
}
interface Update {
  x?: string;
}

const result = merge<Base, Update>({ x: 1 }, { x: '2' });
// result.x type: number | string
```

## Pro Tips 💡

1. **Immutability First**  
   Always returns new objects - perfect for Redux/React state!

2. **Need Circular References?**  
   Use `JSON.parse(JSON.stringify())` first

3. **Browser Support**  
   Works everywhere modern JavaScript runs (IE11 needs polyfills)

4. **Performance**  
   Best for objects < 10k properties - deep merges get expensive!
