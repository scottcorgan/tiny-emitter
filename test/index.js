import Emitter from '../tiny-emitter';
import test from 'tape';

test('subscribes to an event', t => {
  const emitter = new Emitter();
  emitter.on('test', () => { });

  t.equal(emitter.e.test.length, 1, 'subscribed to event');
  t.end();
});

test('subscribes to an event with context', t => {
  const emitter = new Emitter();
  const context = {
    contextValue: true
  };

  emitter.on('test', function () {
    t.ok(this.contextValue, 'is in context');
    t.end();
  }, context);

  emitter.emit('test');
});

test('emits an event', t => {
  const emitter = new Emitter();

  emitter.on('test', () => {
    t.ok(true, 'triggered event');
    t.end();
  });

  emitter.emit('test');
});

test('passes all arguments to event listener', t => {
  const emitter = new Emitter();

  emitter.on('test', (arg1, arg2) => {
    t.equal(arg1, 'arg1', 'passed the first argument');
    t.equal(arg2, 'arg2', 'passed the second argument');
    t.end();
  });

  emitter.emit('test', 'arg1', 'arg2');
});

test('unsubscribes from all events with name', t => {
  const emitter = new Emitter();
  emitter.on('test', () => {
    t.fail('should not get called');
  });
  emitter.off('test');
  emitter.emit('test')

  process.nextTick(() => t.end());
});

test('unsubscribes single event with name and callback', t => {
  const emitter = new Emitter();
  const fn = () => t.fail('should not get called');

  emitter.on('test', fn);
  emitter.off('test', fn);
  emitter.emit('test')

  process.nextTick(() => t.end());
});

// Test added by https://github.com/lazd
// From PR: https://github.com/scottcorgan/tiny-emitter/pull/6
test('unsubscribes single event with name and callback when subscribed twice', t => {
  const emitter = new Emitter();
  const fn = () => t.fail('should not get called');

  emitter.on('test', fn);
  emitter.on('test', fn);

  emitter.off('test', fn);
  emitter.emit('test');

  process.nextTick(() => {
    t.notOk(emitter.e['test'], 'removes all events');
    t.end();
  });
});

test('unsubscribes single event with name and callback when subscribed twice out of order', t => {
  const emitter = new Emitter();
  let calls = 0;
  const fn = () => t.fail('should not get called');
  const fn2 = () => calls++;

  emitter.on('test', fn);
  emitter.on('test', fn2);
  emitter.on('test', fn);
  emitter.off('test', fn);
  emitter.emit('test');

  process.nextTick(() => {
    t.equal(calls, 1, 'callback was called');
    t.end();
  });
});

test('removes an event inside another event', t => {
  const emitter = new Emitter();

  emitter.on('test', () => {
    t.equal(emitter.e.test.length, 1, 'event is still in list');

    emitter.off('test');

    t.notOk(emitter.e.test, 0, 'event is gone from list');
    t.end();
  });

  emitter.emit('test');
});

test('event is emitted even if unsubscribed in the event callback', t => {
  const emitter = new Emitter();
  let calls = 0;
  const fn = () => {
    calls += 1;
    emitter.off('test', fn);
  };

  emitter.on('test', fn);
  emitter.on('test', () => calls += 1);
  emitter.on('test', () => calls += 1);

  process.nextTick(() => {
    t.equal(calls, 3, 'all callbacks were called');
    t.end();
  });

  emitter.emit('test');
});

test('calling off before any events added does nothing', t => {
  const emitter = new Emitter();

  emitter.off('test', () => { });
  t.end();
});

test('emitting event that has not been subscribed to yet', t => {
  const emitter = new Emitter();

  emitter.emit('some-event', 'some message');
  t.end();
});


