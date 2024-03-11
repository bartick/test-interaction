import * as core from '@actions/core';
import { GitHub } from '@actions/github/lib/utils'
import { Collection } from './utils/customMap.class';

export interface GithubPRConstructor {
	new (
        client: InstanceType<typeof GitHub>,
        issue: {owner: string; repo: string; number: number},
        sender: string
    ): GithubPR;
	readonly prototype: GithubPR;
	readonly [Symbol.species]: GithubPRConstructor;
}

export interface GithubPR {
	constructor: GithubPRConstructor;
}

export class GithubPR {

    client: InstanceType<typeof GitHub>;
    owner: string;
    sender: string;
    repo: string;
    _number: number;
    message: Collection<string, string>;

    constructor(
        client: InstanceType<typeof GitHub>,
        issue: {owner: string; repo: string; number: number},
        sender: string
    ) {
        this.client = client;
        this.owner = issue.owner;
        this.sender = sender;
        this.repo = issue.repo;
        this._number = issue.number;
        this.message = this.messageParser();
    }

    copyChecker(): string {
        return "";
    }

    messageParser(): Collection<string, string> {
        const message = core.getInput('pr-message');

        const messageCollection = new Collection<string, string>();

        messageCollection.parseMessage(message);

        return messageCollection;
    }

    copyParser(): void {
        const copy = core.getInput('pr-copy');
        if (!copy) {
            return;
        }
    }

    async comment(): Promise<void> {
        const message = this.message.get(this._number.toString());
        if (!message) {
            return;
        }
    }

    async run(): Promise<void> {
        await this.comment();
    }
}