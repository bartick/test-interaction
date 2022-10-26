"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collection = void 0;
class Collection extends Map {
    constructor(ctx) {
        const iterator = ctx.split('\n').map((i) => i.split(':').map((j) => j.trim()));
        super(iterator);
    }
    addValues(iterator) {
        for (const [key, value] of iterator) {
            const message = this.get(key[0]);
            if (!message)
                continue;
            for (const k of value) {
                this.set(k, message);
            }
        }
    }
}
exports.Collection = Collection;
