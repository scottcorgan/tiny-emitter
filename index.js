/**
 * A Tiny emitter.
 *
 * @class TinyEmitter
 */
class TinyEmitter {
  /**
   * Add an event listener.
   *
   * @param {String} name
   * @param {Function} callback
   * @param {Object} [ctx={}]
   * @returns {TinyEmitter}
   * @memberof TinyEmitter
   */
  on(name, callback, ctx = {}) {
    const e = this.e || (this.e = {});

    (e[name] || (e[name] = [])).push({
      fn: callback,
      ctx
    });

    return this;
  }

  /**
   * Add an event listener that's only run once and then removed.
   *
   * @param {String} name
   * @param {Function} callback
   * @param {Object} [ctx={}]
   * @returns {TinyEmitter}
   * @memberof TinyEmitter
   */
  once(name, callback, ctx = {}) {
    const listener = () => {
      this.off(name, listener);
      callback.apply(ctx, arguments);
    };

    listener._ = callback
    return this.on(name, listener, ctx);
  }

  /**
   * Emit an event.
   *
   * @param {String} name
   * @returns {TinyEmitter}
   * @memberof TinyEmitter
   */
  emit(name) {
    const data = [].slice.call(arguments, 1);
    const events = ((this.e || (this.e = {}))[name] || []).slice();
    const totalEvents = events.length;

    for (let i = 0; i < totalEvents; i++) {
      events[i].fn.apply(events[i].ctx, data);
    }

    return this;
  }

  /**
   * Remove an event listener.
   *
   * @param {String} name
   * @param {Function} [callback] Callback is optional, without it all listeners are removed for this event.
   * @returns {TinyEmitter}
   * @memberof TinyEmitter
   */
  off(name, callback) {
    const e = this.e || (this.e = {});
    const events = e[name];
    const liveEvents = [];

    if (events && callback) {
      for (var i = 0, len = events.length; i < len; i++) {
        if (events[i].fn !== callback && events[i].fn._ !== callback)
          liveEvents.push(events[i]);
      }
    }

    // Remove event from queue to prevent memory leak
    // Suggested by https://github.com/lazd
    // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910
    if (liveEvents.length >= 1) {
      e[name] = liveEvents
    } else {
      delete e[name];
    }

    return this;
  }
};

export default TinyEmitter;
export {
  TinyEmitter
};
