var Emitter = function () {
  this.e = {};
};

Emitter.prototype.on = function (name, callback, ctx) {
  var e = this.e;
  
  e[name] = e[name] || [];
  e[name].push({
    fn: callback,
    ctx: ctx || null
  });
  
  return this;
};

Emitter.prototype.emit = function (name) {
  var data = [].slice.call(arguments, 1);
  var evtArr = this.e[name] || [];
  
  for (var i in evtArr) {
    evtArr[i].fn.apply(evtArr[i].ctx, data);
  }
  
  return this;
};

Emitter.prototype.off = function (name, callback) {
  var e = this.e;
  var evts = e[name];
  
  if (!callback) {
    e[name] = [];
  }
  else {
    for (var idx in evts) {
      if (!evts || !evts[idx]) continue;
      if (evts[idx].fn !== callback) continue;
      
      evts.splice(idx, 1);
    }
  }
  
  return this;
};

module.exports = Emitter;