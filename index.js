var Emitter = function () {
  this._events = {};
};

Emitter.prototype.on = function (evt, callback, context) {
  this._events[evt] = this._events[evt] || [];
  this._events[evt].push({
    fn: callback,
    context: context || null
  });
  
  return this;
};

Emitter.prototype.emit = function (evt) {
  var data = [].slice.call(arguments, 1);
  var evtArr = this._events[evt] || [];
  
  for (var i in evtArr) {
    evtArr[i].fn.apply(evtArr[i].context, data);
  }
  
  return this;
};

Emitter.prototype.off = function (evt, callback) {
  var self = this;
  
  if (!callback) return this._events[evt] = [];
  
  for (var idx in this._events[evt]) {
    if (!this._events[evt] || !this._events[evt][idx]) continue;
    if (this._events[evt][idx].fn !== callback) continue;
    
    this._events[evt].splice(idx, 1);
  }
  
  return this;
};

module.exports = Emitter;