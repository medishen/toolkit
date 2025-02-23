# Frequently Asked Questions (FAQ)

## General

### What is `@medishn/toolkit`?

`@medishn/toolkit` is a collection of utility functions and tools designed to simplify common development tasks. It includes utilities for deep object inspection, type checking, data manipulation, and more.

### Who maintains this project?

The project is maintained by [Your Name/Organization] and a community of contributors. If you'd like to become a contributor, check out our [Contributing Guide](CONTRIBUTING.md).

### Is this project production-ready?

Yes, `@medishn/toolkit` is designed with stability and performance in mind. However, always test thoroughly before using in critical applications.

## Usage

### How do I install `@medishn/toolkit`?

You can install it via npm:

```bash
npm install @medishn/toolkit
```

### How do I use the `peek` utility?

The `peek` utility allows you to safely inspect and traverse nested objects. Here's an example:

```typescript
import { peek } from "@medishn/toolkit";

const data = { user: { name: "John", age: 30 } };
const name = peek(data).into("user").get("name"); // 'John'
```

### Can I use this in a browser environment?

Yes, `@medishn/toolkit` is compatible with both Node.js and browser environments.

## Contributing

### How can I contribute?

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) for details on how to get started.

### What if I find a bug?

If you find a bug, please [open an issue](https://github.com/medishen/toolkit/issues) with a detailed description of the problem.

### Can I request a new feature?

Absolutely! Open an issue with your feature request, and we'll discuss it with the community.

## Licensing

### What license does `@medishn/toolkit` use?

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

### Can I use this in my commercial project?

Yes, the MIT License allows you to use, modify, and distribute the code in both open-source and commercial projects.

## Troubleshooting

### Why are my changes not reflected after installation?

Ensure you've installed the latest version of the package. If the issue persists, clear your npm cache and reinstall:

```bash
npm cache clean --force
npm install @medishn/toolkit
```

### How do I debug issues with the utilities?

Enable debug logging (if supported) or use the `inspect` utility to examine objects and their structure.
