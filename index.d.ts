type Arguments<T> = [T] extends [(...args: infer U) => any] ? U : [T] extends [void] ? [] : [T];

export declare class TinyEmitter<T extends any = any> {
  on<E extends keyof T>(event: E, callback: T[E], ctx?: any): this;
  once<E extends keyof T>(event: E, callback: T[E], ctx?: any): this;
  emit<E extends keyof T>(event: E, ...args: Arguments<T[E]>): this;
  off<E extends keyof T>(event: E, callback?: T[E]): this;
}

interface TinyEmitterStatic {
  (): TinyEmitter;
  new(): TinyEmitter;
}

declare const Emitter: TinyEmitterStatic;

export default Emitter;
