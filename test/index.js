var Emitter = require('../index.js');
var test = require('tape');

test('subscribes to an event', function (t) {
  var emitter = new Emitter();
  emitter.on('test', function () {});
  
  t.equal(emitter.e.test.length, 1, 'subscribed to event');
  t.end();
});

test('subscribes to an event with context', function (t) {
  var emitter = new Emitter();
  var context = {
    contextValue: true
  };
  
  emitter.on('test', function () {
    t.ok(this.contextValue, 'is in context');
    t.end();
  }, context);
  
  emitter.emit('test');
});

test('emits an event', function (t) {
  var emitter = new Emitter();
  
  emitter.on('test', function () {
    t.ok(true, 'triggered event');
    t.end();
  });
  
  emitter.emit('test');
});

test('passes all arguments to event listener', function (t) {
  var emitter = new Emitter();
  
  emitter.on('test', function (arg1, arg2) {
    t.equal(arg1, 'arg1', 'passed the first argument');
    t.equal(arg2, 'arg2', 'passed the second argument');
    t.end();
  });
  
  emitter.emit('test', 'arg1', 'arg2');
});

test('unsubscribes from all events with name', function (t) {
  var emitter = new Emitter();
  emitter.on('test', function () {
    t.ok(false, 'should not get called');
  });
  emitter.off('test');
  emitter.emit('test')
  
  process.nextTick(function () {
    t.end();
  });
});

test('unsubscribes single event with name and callback', function (t) {
  var emitter = new Emitter();
  var fn = function () {
    t.ok(false, 'should not get called');
  }
  
  emitter.on('test', fn);
  emitter.off('test', fn);
  emitter.emit('test')
  
  process.nextTick(function () {
    t.end();
  });
});

