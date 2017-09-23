class Emitter {
  emit(event, ...args) {
    if (!event) return this;
    for (const fn of this._e(event)) {
      fn.apply(fn.ctx, [...args]);
      if (fn.off_event == true) this.off(event, fn);
    }
    return this;
  }
  on(event, fn, ctx) {
    if (!event) return this;
    fn.ctx = ctx;
    this._e(event).push(fn);
    return this;
  }
  once(event, fn, ctx) {
    if (!event) return this;
    fn.ctx = ctx;
    fn.off_event = true;
    return this.on(event, fn);
  }
  off(event, fn) {
    if (!event) return this;
    if (!this[event]) return this;
    const e = this._e(event);
    if (!fn) {
      delete this[event];
      return this;
    }
    this[event] = e.filter((f) => f != fn);
    return this;
  }
  _e(e) {
    return this[e] || (this[e] = []);
  }
}
module.exports = Emitter;
