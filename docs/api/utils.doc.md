# @medishn/toolkit Core Utilities Documentation

This document explains the fundamental building blocks used throughout the toolkit. These utilities help write cleaner, safer TypeScript code.

## **Basic Type Helpers**

### **1. Constructor<T>**

**What it does:**  
Represents a class blueprint. Useful when working with classes directly.

**Example:**

```typescript
class Car {}
const createVehicle = (ctor: Constructor<Car>) => new ctor();
createVehicle(Car); // Works!
```

### **2. Maybe<T>**

**What it does:**  
"Maybe there's a value, maybe not." Represents optional values.

**Example:**

```typescript
let username: Maybe<string>; // Can be string, null, or undefined
username = 'John';
username = null; // Also OK
```

### **3. Dictionary<T>**

**What it does:**  
A fancy name for simple key-value objects.

**Example:**

```typescript
const prices: Dictionary<number> = {
  apple: 1.99,
  banana: 0.99,
};
```

### **4. Numeric**

**What it does:**  
For when you need to work with both regular numbers and big numbers.

**Example:**

```typescript
function add(a: Numeric, b: Numeric): Numeric {
  return a + b; // Works with 5 or 9007199254740991n
}
```

## **Type Safety Helpers**

### **5. Primitive & PrimitiveObject**

**What they do:**

- `Primitive`: Basic value types (string, number, etc.)
- `PrimitiveObject`: Their object versions (String, Number, etc.)

**Example:**

```typescript
function logValue(val: Primitive) {
  console.log(val); // Accepts "hello", 42, true, etc.
}
```

### **6. Noop & Callback**

**What they do:**

- `Noop`: Empty function placeholder
- `Callback`: Flexible function with arguments

**Example:**

```typescript
const emptyFunction: Noop = () => {};
const buttonClick: Callback<[MouseEvent]> = (event) => {...};
```

## **Advanced**

### **7. Nullable<T>**

**What it does:**  
Makes all properties in an object optional (can be null).

**Example:**

```typescript
type User = { name: string; age: number };
type SafeUser = Nullable<User>; // { name: string|null; age: number|null }
```

### **8. NonX Types**

**What they do:**

- `NonNull<T>`: No nulls allowed
- `NonUndefined<T>`: No undefined
- `NonNullable<T>`: No null/undefined

**Example:**

```typescript
function requireValue(val: NonNull<string>) {
  // val can't be null here
}
```

## **HTTP Status Codes**

### **9. HttpStatus Enum**

**What it does:**  
Named constants for HTTP status codes. No more remembering numbers!

**Common uses:**

```typescript
res.status(HttpStatus.NOT_FOUND); // Instead of 404
if (errorCode === HttpStatus.UNAUTHORIZED) { ... }
```

**Full list includes:**

```typescript
HttpStatus.OK; // 200
HttpStatus.NOT_FOUND; // 404
HttpStatus.I_AM_A_TEAPOT; // 418 🫖
HttpStatus.INTERNAL_SERVER_ERROR; // 500
```

[Explore More Utilities ↗](https://github.com/medishen/toolkit/docs)  
[Contribute ↗](https://github.com/medishen/toolkit/CONTRIBUTING.md)
