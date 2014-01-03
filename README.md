# tiny-emitter
 
A tiny (less than 500 bytes) event emitter library
 
## Install
 
```
npm install tiny-emitter --save
```
 
## Usage
 
```js
var Emitter = require('tiny-emitter');
var emitter = new Emitter();

emitter.on('some-event', function (arg1, arg2, arg3) {
 //  
});

emitter.emit('some-event', 'arg1 value', 'arg2 value', 'arg3 value');
```
 
## Instance Methods

### on(event, callback[, context])

Subscribe to an event

* `event` - the name of the event to subscribe to
* `callback` - the function to call when event is emitted
* `context` - (OPTIONAL) - the context to bind the event callback to

### off(event[, callback])

Unsubscribe from an event or all events. If no callback is provided, it unsubscribes you from all events.

* `event` - the name of the event to unsubscribe from
* `callback` - the function used when binding to the event

### emit(event[, arguments...])

* `event` - the event name to emit
* `arguments...` - any number of arguments to pass to the event subscribers
 
## Run Tests
 
```
npm install
npm test
```