# @medishn/toolkit Logger Documentation 📝

A colorful, configurable logger for Node.js applications. Perfect for when you need more pizzazz than console.log but don't want the overhead of big logging libraries. Let's make those terminal outputs pretty!

## Quick Example

```typescript
import { Logger } from '@medishn/toolkit';

const logger = new Logger({
  context: 'AuthService',
  logLevels: ['error', 'warn', 'debug'],
});

logger.info('User logged in'); // Won't show (not in logLevels)
logger.error('Login failed', { userId: 123 }); // Red alert! 🔴
```

## Installation

No external dependencies are required. Just import and use:

```ts
import { Logger } from '@medishn/toolkit';
```

## Logger Options

The `Logger` class can be configured using an optional `LoggerOptions` object.

## Configuration Options ⚙️

| Option           | Type    | Default         | Description                                                  |
| ---------------- | ------- | --------------- | ------------------------------------------------------------ |
| `context`        | string  | `'Application'` | Your service/module name                                     |
| `logLevels`      | Array   | All levels      | What to log: `['error', 'warn', 'info', 'debug', 'verbose']` |
| `colorful`       | boolean | `true`          | Fancy colors in terminal? 🌈                                 |
| `displayContext` | boolean | `true`          | Show/hide context tag                                        |

```typescript
// Production-ready config
const prodLogger = new Logger({
  context: 'PaymentGateway',
  logLevels: ['error', 'warn'],
  colorful: false,
});
```

---

## Log Levels

`Logger` supports the following log levels:

- `info` - General application messages
- `error` - Errors and exceptions
- `warn` - Warnings about potential issues
- `debug` - Debugging information
- `verbose` - Detailed logs for deep insights

By default, all levels are enabled. You can customize which levels are allowed using `logLevels`.

## Color Customization 🎨

We've got all the pretty colors! Here's how levels look by default:

| Level   | Color  | Style |
| ------- | ------ | ----- |
| error   | Red    | Bold  |
| warn    | Yellow | Bold  |
| info    | Green  | Bold  |
| debug   | Blue   | Dim   |
| verbose | Purple | Dim   |

Customize colors using the `Style` constants:

```typescript
logger.styles.warn = ['BgBlack', 'FgBlack', 'Bold'];
```

If `colorful: false` is set, all logs appear in plain text.

## Usage

### Basic Example

```ts
const logger = new Logger();
logger.info('Server started', { port: 3000 });
logger.error('Something went wrong');
```

### Custom Context

```ts
const dbLogger = new Logger({ context: 'Database' });
dbLogger.warn('Connection is slow');
```

### Disable Colors

```ts
const plainLogger = new Logger({ colorful: false });
plainLogger.info('No colors in this log');
```

### Filter Log Levels

```ts
const filteredLogger = new Logger({ logLevels: ['error', 'warn'] });
filteredLogger.info('This will not be logged');
filteredLogger.error('This will be logged');
```

---

## Logger Methods

### `info(message: any, ...optionalParams: any[]): void`

Logs an informational message.

```ts
logger.info('User logged in', { userId: 123 });
```

---

### `error(message: any, ...optionalParams: any[]): void`

Logs an error message.

```ts
logger.error('File not found', 'config.json');
```

---

### `warn(message: any, ...optionalParams: any[]): void`

Logs a warning.

```ts
logger.warn('Low memory warning');
```

---

### `debug(message: any, ...optionalParams: any[]): void`

Logs debug information.

```ts
logger.debug('Variable state', { foo: 'bar' });
```

---

### `verbose(message: any, ...optionalParams: any[]): void`

Logs detailed information for deeper insights.

```ts
logger.verbose('Loading configuration', { path: './config.json' });
```

## Example Output

```
[Application] [INFO] Server started { port: 3000 }
[Application] [ERROR] File not found "config.json"
```

> **Note:** Colors only work in terminals that support ANSI escape codes. No rainbow text in production logs! 🌧️
