import Emitter from '../tiny-emitter';
import emitter from '../tiny-emitter-instance';
import test from 'tape';

test('exports an instance', t => {
  t.ok(emitter, 'exports an instance')
  t.ok(emitter instanceof Emitter, 'an instance of the Emitter class');
  t.end();
});