# @medishn/toolkit HTTP Exceptions Documentation 🚨

Handle HTTP errors like a pro with these ready-to-use exception classes and utilities. Perfect for building REST APIs that follow best practices!

## Quick Example 🌟

```typescript
import { NotFoundException, HttpException } from '@medishn/toolkit';

// Throw a 404 error
throw new NotFoundException({
  detail: 'User 123 not found',
  instance: '/users/123',
});

// Custom error with extra info
throw new HttpException(422, {
  type: 'https://api.com/errors/invalid-email',
  title: 'Invalid Email Format',
  extensions: {
    suggestedFormat: 'user@domain.com',
  },
});
```

## What's in the Box? 📦

### 1. **Pre-Built Exceptions**

All common HTTP status codes ready to use:

```typescript
// 400 Bad Request
throw new BadRequestException();

// 401 Unauthorized
throw new UnauthorizedException();

// 404 Not Found
throw new NotFoundException({ detail: 'Post not found' });

// 500 Internal Error
throw new InternalServerErrorException();
```

### 2. **RFC 7807 Problem Details**

Standard error format out-of-the-box:

```json
{
  "type": "about:blank",
  "title": "Not Found",
  "status": 404,
  "detail": "User 123 not found",
  "instance": "/users/123",
  "traceId": "abc123"
}
```

### 3. **Customization Superpowers** 🦸

Add extra context to errors:

```typescript
throw new ForbiddenException({
  type: 'https://api.com/errors/insufficient-credits',
  title: 'Insufficient Credits',
  extensions: {
    currentBalance: 5,
    requiredBalance: 10,
  },
});
```

---

## Main Components 🔧

### 1. **HTTP Error Constants**

All status codes with descriptions:

```typescript
import { HTTP_ERRORS } from '@medishn/toolkit';

console.log(HTTP_ERRORS.NOT_FOUND);
// {
//   status: 404,
//   message: 'Not Found',
//   description: 'Requested resource could not be found'
// }
```

### 2. **Exception Classes**

Pick your status code:

| Status | Class Name                     | Typical Use          |
| ------ | ------------------------------ | -------------------- |
| 400    | `BadRequestException`          | Invalid user input   |
| 401    | `UnauthorizedException`        | Missing/invalid auth |
| 403    | `ForbiddenException`           | No permission        |
| 404    | `NotFoundException`            | Missing resource     |
| 429    | `TooManyRequestsException`     | Rate limiting        |
| 500    | `InternalServerErrorException` | Server oopsie        |

### 3. **Base HttpException**

For custom status codes:

```typescript
// Custom 418 I'm a teapot error
throw new HttpException(418, {
  title: 'Teapot Mode Activated',
  detail: 'Cannot brew coffee, I am a teapot',
});
```

---

## Customization Guide 🎨

### Add Extra Info

```typescript
throw new ConflictException({
  detail: 'Email already registered',
  extensions: {
    conflictingField: 'email',
    existingUser: 'user@example.com',
  },
});
```

### Change Error Type URI

```typescript
throw new BadRequestException({
  type: 'https://api.com/errors/invalid-input',
  title: 'Validation Failed',
});
```

### Add Tracing ID

```typescript
const error = new InternalServerErrorException();
const response = error.getProblemDetails('req-123');
```

---

## Error Response Format 📄

All exceptions return this standardized format:

```json
{
  "type": "error-category",
  "title": "Short error summary",
  "status": 404,
  "detail": "Detailed explanation",
  "instance": "/path/where-error-happened",
  "traceId": "request-correlation-id",
  "customField": "Additional info"
}
```

---

> **Tip:** Use the `getProblemDetails()` method to format errors for API responses! 🚀

[Learn RFC 7807 ↗](https://datatracker.ietf.org/doc/html/rfc7807)
