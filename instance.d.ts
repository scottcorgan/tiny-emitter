import TinyEmitter = require("./index");

declare const instance: TinyEmitter & {
  TinyEmitter: typeof TinyEmitter;
};

export = instance;
