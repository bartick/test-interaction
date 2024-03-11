export interface CollectionConstructor {
	new <K, V>(): Collection<K, V>;
	readonly prototype: Collection<unknown, unknown>;
	readonly [Symbol.species]: CollectionConstructor;
}

export interface Collection<K, V> extends Map<K, V> {
	constructor: CollectionConstructor;
}

export class Collection<K, V> extends Map<K, V> {
    constructor() {
        super();
    }

    parseMessage(message: string) {

        const messageArray = message.split('\n');
        let key: K = '1' as unknown as K;
        let value: V = '' as unknown as V;

        //regex starts with a number and a colon
        const regex = /^\d+:/;

        for(let i=0; i<messageArray.length; i++) {
            if(messageArray[i] == '') {
                continue;
            }

            if(regex.test(messageArray[i])) {
                if(value !== '') {
                    this.set(key, value);
                    value = '' as unknown as V;
                }
                key = messageArray[i].split(':')[0] as unknown as K;
                value = messageArray[i].split(':')[1] as unknown as V;
            } else {
                value = value + '\n' + messageArray[i] as unknown as V;
            }
        }

        if (value !== '') {
            this.set(key as K, value as V);
        }

        return this;

        
    }

    parseCopy(message: string) {}
}

const collection = new Collection<string, string>();

const data = `
9: Hello there
This is the followup line
8: How are you?
7: I'm fine, thanks`

console.log(collection.parseMessage(data));
