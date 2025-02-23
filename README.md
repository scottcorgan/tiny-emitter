# tiny-emitter

A tiny (less than 1k) event emitter library.

## Install

### npm

```
npm install tiny-emitter --save
```

## Usage

```js
var Emitter = require("tiny-emitter");
var emitter = new Emitter();

emitter.on("some-event", function (arg1, arg2, arg3) {
  //
});

emitter.emit("some-event", "arg1 value", "arg2 value", "arg3 value");
```

Alternatively, you can skip the initialization step by requiring `tiny-emitter/instance` instead. This pulls in an already initialized emitter.

```js
var emitter = require("tiny-emitter/instance");

emitter.on("some-event", function (arg1, arg2, arg3) {
  //
});

emitter.emit("some-event", "arg1 value", "arg2 value", "arg3 value");
```

## Instance Methods

### on(event, callback[, context])

Subscribe to an event

- `event` - the name of the event to subscribe to
- `callback` - the function to call when event is emitted
- `context` - (OPTIONAL) - the context to bind the event callback to

### once(event, callback[, context])

Subscribe to an event only **once**

- `event` - the name of the event to subscribe to
- `callback` - the function to call when event is emitted
- `context` - (OPTIONAL) - the context to bind the event callback to

### off(event[, callback])

Unsubscribe from an event or all events. If no callback is provided, it unsubscribes you from all events.

- `event` - the name of the event to unsubscribe from
- `callback` - the function used when binding to the event

### emit(event[, arguments...])

Trigger a named event

- `event` - the event name to emit
- `arguments...` - any number of arguments to pass to the event subscribers

## Usage With TypeScript

TinyEmitter provides full TypeScript type support. You can use it in two primary ways:

### Basic Usage (Dynamic Typing)

```typescript
import Emitter from "tiny-emitter";

const emitter = new Emitter();

// Dynamic event typing (no constraints on event names/arguments)
emitter.on("custom-event", (a: number, b: string) => {
  console.log(a, b.toUpperCase());
});

emitter.emit("custom-event", 42, "hello"); // ✅ Correct usage
// emitter.emit('custom-event', 'wrong', 1); // ❌ Type error
```

### Strict Typing (Predefined Events, Recommend)

```typescript
import { TinyEmitter } from "tiny-emitter";

// 1. Define event type
type AppEvents = {
  "user:login": (username: string, timestamp: number) => void;
  "cart:checkout": (items: string[], total: number) => boolean;
};

// 2. Create typed emitter instance
const emitter = new TinyEmitter<AppEvents>();

// ✅ Valid usage
emitter.on("user:login", (name, ts) => {
  console.log(`${name} logged at ${new Date(ts).toISOString()}`);
});

emitter.emit("cart:checkout", ["item1", "item2"], 99.99);

// ❌ Type errors
// emitter.on('unknown.event', () => {});  // Unknown event
// emitter.emit('user:login', 123, 'name'); // Argument mismatch
```

### Type Features

- Automatic Argument Inference: `emit()`arguments are strictly checked against event handler signatures
- Context Safety: context parameter type is separated from callback parameters
- Strict Validation:

```typescript
// Compile-time errors:
emitter.off("cart:checkout", (items: number[]) => {}); // ❌ Callback signature mismatch
emitter.once("user:login", (name: string) => name.length); // ✅ Return type inferred
```

### Recommended Configuration

Add these to your `tsconfig.json` for optimal experience:

```json
{
  "compilerOptions": {
    "esModuleInterop": true,
    "strict": true
  }
}
```

## Test and Build

Build (Tests, Browserifies, and minifies)

```
npm install
npm run build
```

Test

```
npm install
npm test
```

## License

[MIT](https://github.com/scottcorgan/tiny-emitter/blob/master/LICENSE)
