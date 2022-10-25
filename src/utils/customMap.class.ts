export interface CollectionConstructor {
	new <K, V>(ctx: string): Collection<K, V>;
	readonly prototype: Collection<unknown, unknown>;
	readonly [Symbol.species]: CollectionConstructor;
}

export interface Collection<K, V> extends Map<K, V> {
	constructor: CollectionConstructor;
}

export class Collection<K, V> extends Map<K, V> {
    constructor(ctx: string) {
        const iterator: string[][] = ctx.split('\n').map((i) => i.split(':').map((j) => j.trim()));
        super(iterator as Iterable<[K, V]>);
    }
}