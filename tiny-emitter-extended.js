import TinyEmitter from './tiny-emitter';

class TinyEmitterExtended extends TinyEmitter {
  once(name, callback, ctx) {
    const listener = () => {
      this.off(name, listener);
      callback.apply(ctx, arguments);
    };

    listener._ = callback
    return this.on(name, listener, ctx);
  }
}

export default TinyEmitterExtended;