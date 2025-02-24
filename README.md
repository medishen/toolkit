# @medishn/toolkit

[![npm version](https://img.shields.io/npm/v/@medishn/toolkit?color=blue)](https://www.npmjs.com/package/@medishn/toolkit)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./docs/CONTRIBUTING.md)

## Features

### **Core Utilities**

- **Object Inspection** - Safely navigate nested structures with `inspect()`
- **Deep Merging** - Type-safe object merging with `merge()`
- **Data Transformation** - Chainable `map()`, `filter()`, `reduce()` operations

### **Type Safety**

- **40+ Type Guards** - Runtime validation with `isString`, `isObject`, `isPromise`, etc.
- **Advanced Types** - `Maybe<T>`, `Dictionary<T>`, `Nullable<T>`, and other essential helpers
- **HTTP Status Codes** - Full `HttpStatus` enum with RFC-compliant values

### **Logging**

- Colorful console output 🌈
- Context-aware logging
- Multiple log levels (`error`, `warn`, `info`, `debug`, `verbose`)

### **Error Handling**

- Standardized HTTP exceptions
- RFC 7807 Problem Details format
- Custom error creation utilities

---

## Installation 📦

```bash
npm install @medishn/toolkit
# or
yarn add @medishn/toolkit
```

---

## Quick Start 🚀

```typescript
import { inspect, Logger, HttpStatus } from '@medishn/toolkit';

// Object Inspection
const userData = inspect(rawData).to('profile').get('email');

// Logging
const logger = new Logger({ context: 'Auth' });
logger.info('User logged in', { userId: 123 });

// Error Handling
throw new NotFoundException({
  detail: 'Resource not found',
  status: HttpStatus.NOT_FOUND,
});

// Type Safety
if (isDate(someValue)) {
  console.log('Timestamp:', someValue.toISOString());
}
```

---

## Documentation 📚

Explore our comprehensive guides:

- [Object Inspection & Manipulation](./docs/api/inspect.doc.md)
- [Logging Best Practices](./docs/api/logger.doc.md)
- [Error Handling Guide](./docs/api/error.doc.md)
- [Http Exception Handling Guide](./docs/api/http-exception.doc.md)
- [Merge Object And Arrau Guide](./docs/api/merge.doc.md)
- [Type Guard Utilities Guide](./docs/api/type-guard.doc.md)
- [Type Utilities Reference](./docs/api/utils.doc.md)
- [Full API Documentation](./docs/api)

---

## Contributing 🤝

We welcome contributions! Please see our:

- [Contribution Guide](./docs/CONTRIBUTING.md)
- [Code of Conduct](./docs/CODE_OF_CONDUCT.md)

---

## License 📄

MIT © [Your Name]. See [LICENSE](./LICENSE) for details.

---

## Support & Feedback 💬

Found a bug? Have a feature request?  
[Open an Issue](https://github.com/medishen/toolkit/issues)  
Get quick help: [bitsgenix@gmail.com](mailto:bitsgenix@gmail.com)

⭐ **Love this package?** Leave a star on GitHub to show your support!
