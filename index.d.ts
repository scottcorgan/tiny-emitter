export declare class TinyEmitter {
  on(event: string, callback: Function, ctx?: any): this;
  once(event: string, callback: Function, ctx?: any): this;
  emit(event: string, ...args: any[]): this;
  off(event: string, callback?: Function): this;
}

interface TinyEmitterStatic {
  (): TinyEmitter;
  new(): TinyEmitter;
}

declare const Emitter: TinyEmitterStatic;

export = Emitter;
