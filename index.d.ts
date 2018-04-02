
declare module 'tiny-emitter' {

	namespace TinyEmitter {
		interface Event<D> {
			fn: Listener<D>
			ctx: any
		}
		type Events<D> = { [event: string]: Event<D>[] };
		type Listener<D> = (...args: D[]) => void;
	}

	class TinyEmitter<E = string, D = any> {
		e: TinyEmitter.Events<D>
		on(event: E, listener: TinyEmitter.Listener<D>, ctx?: any): this;
		once(event: E, listener: TinyEmitter.Listener<D>, ctx?: any): this;
		emit(event: E, ...args: D[]): this;
		off(event: E, listener?: TinyEmitter.Listener<D>): this;
	}

	export = TinyEmitter;

}
