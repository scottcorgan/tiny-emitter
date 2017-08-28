import test from 'tape';
import Emitter from '../tiny-emitter-extended';

test('subscibes only once to an event', t => {
  const emitter = new Emitter();

  emitter.once('test', () => {
    t.notOk(emitter.e.test, 'removed event from list');
    t.end();
  });

  emitter.emit('test');
});

test('keeps context when subscribed only once', t => {
  const emitter = new Emitter();
  const context = {
    contextValue: true
  };

  emitter.once('test', function () {
    t.ok(this.contextValue, 'is in context');
    t.notOk(emitter.e.test, 'not subscribed anymore');
    t.end();
  }, context);

  emitter.emit('test');
});

test('unsubscribes single event with name and callback which was subscribed once', t => {
  const emitter = new Emitter();
  const fn = () => t.fail('event not unsubscribed');

  emitter.once('test', fn);
  emitter.off('test', fn);
  emitter.emit('test');

  setTimeout(() => {
    t.pass('Unsubscribed listener');
    t.end();
  }, 0);
});