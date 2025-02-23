type KeyType = string | symbol;

type EventHandler<Args extends unknown[] = unknown[]> = (...args: Args) => void;

declare class TinyEmitter<
  T extends Record<KeyType, EventHandler> = Record<KeyType, EventHandler>
> {
  constructor();
  on<E extends keyof T, Ctx = unknown>(
    eventName: E,
    callback: T[E],
    context?: Ctx
  ): this;
  once<E extends keyof T, Ctx = unknown>(
    eventName: E,
    callback: T[E],
    context?: Ctx
  ): this;
  emit<E extends keyof T>(eventName: E, ...args: Parameters<T[E]>): this;
  off<E extends keyof T>(eventName: E, callback?: T[E]): this;
}

declare namespace TinyEmitter {
  const TinyEmitter: typeof TinyEmitter;
}

export = TinyEmitter;
