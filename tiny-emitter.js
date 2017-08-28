class TinyEmitter {
  e = {}

  on(name, fn, ctx) {
    const eventsQueue = this.e;
    (eventsQueue[name] || (eventsQueue[name] = [])).push({ fn, ctx });
    return this;
  }

  off(name, callback) {
    const eventsQueue = this.e;
    const events = eventsQueue[name];
    const liveEvents = [];

    if (events && callback) {
      for (let i = 0, len = events.length; i < len; i++) {
        if (events[i].fn !== callback && events[i].fn._ !== callback)
          liveEvents.push(events[i]);
      }
    }

    // Remove event from queue to prevent memory leak
    // Suggested by https://github.com/lazd
    // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

    (liveEvents.length)
      ? eventsQueue[name] = liveEvents
      : delete eventsQueue[name];

    return this;
  }

  emit(name) {
    const data = [].slice.call(arguments, 1);
    const events = (this.e[name] || []).slice();
    const len = events.length;
    let i = 0;

    for (i; i < len; i++) {
      events[i].fn.apply(events[i].ctx, data);
    }

    return this;
  }
}

export default TinyEmitter;
