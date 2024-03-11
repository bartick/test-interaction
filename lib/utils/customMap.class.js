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
            if (messageArray[i] == '') {
                continue;
            }
            if (regex.test(messageArray[i])) {
                if (value !== '') {
                    this.set(key, value);
                    value = '';
                }
                key = messageArray[i].split(':')[0];
                value = messageArray[i].split(':')[1];
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
const collection = new Collection();
const data = `
9: Hello there
This is the followup line
8: How are you?
7: I'm fine, thanks`;
console.log(collection.parseMessage(data));
