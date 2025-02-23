import { TinyEmitter } from "./index";

declare const instance: TinyEmitter & {
  TinyEmitter: typeof TinyEmitter;
};

export = instance;
