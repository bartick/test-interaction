"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collection = void 0;
class Collection extends Map {
    constructor() {
        super();
    }
    parseMessage(message) {
        const messageArray = message.split('\n');
        let key = '1';
        let value = '';
        //regex starts with a number and a colon
        const regex = /^\d+:/;
        for (let i = 0; i < messageArray.length; i++) {
            if (regex.test(messageArray[i])) {
                if (value !== '') {
                    this.set(key, value);
                    value = '';
                }
                key = messageArray[i].split(':')[0];
            }
            else {
                value = value + '\n' + messageArray[i];
            }
        }
        if (value !== '') {
            this.set(key, value);
        }
        return this;
    }
    parseCopy(message) { }
}
exports.Collection = Collection;
