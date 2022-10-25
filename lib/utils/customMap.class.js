"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collection = void 0;
class Collection extends Map {
    constructor(ctx) {
        const iterator = ctx.split('\n').map((i) => i.split(':').map((j) => j.trim()));
        super(iterator);
    }
}
exports.Collection = Collection;
