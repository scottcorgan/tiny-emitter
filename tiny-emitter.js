class TinyEmitter {
  e = {};

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

export default TinyEmitter


// function E () {
//   // Keep this empty so it's easier to inherit from
//   // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
// }

// E.prototype = {
//   on: function (name, callback, ctx) {
//     var e = this.e || (this.e = {});

//     (e[name] || (e[name] = [])).push({
//       fn: callback,
//       ctx: ctx
//     });

//     return this;
//   },

//   once: function (name, callback, ctx) {
//     var self = this;
//     function listener () {
//       self.off(name, listener);
//       callback.apply(ctx, arguments);
//     };

//     listener._ = callback
//     return this.on(name, listener, ctx);
//   },

//   emit: function (name) {
//     var data = [].slice.call(arguments, 1);
//     var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
//     var i = 0;
//     var len = evtArr.length;

//     for (i; i < len; i++) {
//       evtArr[i].fn.apply(evtArr[i].ctx, data);
//     }

//     return this;
//   },

//   off: function (name, callback) {
//     var e = this.e || (this.e = {});
//     var evts = e[name];
//     var liveEvents = [];

//     if (evts && callback) {
//       for (var i = 0, len = evts.length; i < len; i++) {
//         if (evts[i].fn !== callback && evts[i].fn._ !== callback)
//           liveEvents.push(evts[i]);
//       }
//     }

//     // Remove event from queue to prevent memory leak
//     // Suggested by https://github.com/lazd
//     // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

//     (liveEvents.length)
//       ? e[name] = liveEvents
//       : delete e[name];

//     return this;
//   }
// };

// module.exports = E;
