import * as core from '@actions/core';
import { GitHub } from '@actions/github/lib/utils'
import { Collection } from './utils/customMap.class';

export interface GithubIssueConstructor {
	new (
        client: InstanceType<typeof GitHub>,
        issue: {owner: string; repo: string; number: number},
        sender: string
    ): GithubIssue;
	readonly prototype: GithubIssue;
	readonly [Symbol.species]: GithubIssueConstructor;
}

export interface GithubIssue {
	constructor: GithubIssueConstructor;
}

export class GithubIssue {
    
    private owner: string; 
    private repo: string; 
    private _number: number; 
    private _sender: string; 
    private client: InstanceType<typeof GitHub>;
    private messageCollection: Collection<string, string>;

    constructor(
        client: InstanceType<typeof GitHub>,
        issue: {owner: string; repo: string; number: number},
        sender: string,
    ) {
        this.client = client;
        this.owner = issue.owner;
        this.repo = issue.repo;
        this._number = issue.number;
        this._sender = sender;
        this.messageCollection = this.messageParser();
    }

    messageParser(): Collection<string, string> {
        const message = core.getInput('issue-message');

        const messageCollection = new Collection<string, string>();

        messageCollection.parseMessage(message);

        return messageCollection;
    }

    copyParser(): void {
        const copy = core.getInput('issue-copy');
        if (!copy) {
            return;
        }
    }

    async comment(): Promise<void> {
        console.log(this.messageCollection)
        console.log(this._number.toString())
        const message = this.messageCollection.get(this._number.toString());
        if (!message) {
            console.log('Issue not mentioned in config, skipping');
            return;
        }

        await this.client.rest.issues.createComment({
            owner: this.owner,
            repo: this.repo,
            issue_number: this._number,
            body: message,
        });
    }

    async run(): Promise<void> {
        await this.comment();
    }
}