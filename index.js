function E () {
  this.e = {};
}

E.prototype = {
  on: function (name, callback, ctx) {
    var e = this.e;
    
    (e[name] || (e[name] = [])).push({
      fn: callback,
      ctx: ctx
    });
    
    return this;
  },

  once: function (name, callback, ctx) {
    var self = this;
    var fn = function () {
      self.off(name, fn);
      callback.apply(ctx, arguments);
    };
    
    return this.on(name, fn, ctx);
  },

  emit: function (name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = (this.e[name] || []).slice();
    var i;
    
    for (i in evtArr) {
      evtArr[i].fn.apply(evtArr[i].ctx, data);
    }
    
    return this;
  },

  off: function (name, callback) {
    var e = this.e;
    var evts = e[name];
    var i;
    
    if (evts && callback) {
      for (i in evts) {
        if (evts[i].fn !== callback) continue;
        evts.splice(i, 1);
      }
    }
    else if (evts) {
      e[name] = [];
    }
    
    return this;
  }
};

module.exports = E;