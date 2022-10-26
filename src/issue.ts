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
    private sender: string; 
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
        this.sender = sender;
        this.messageCollection = new Collection(core.getInput('issue'));
    }

    copyChecker() {
        const copy = core.getInput('copy');
        console.log(copy);
        // if (copy) {
        //     this.messageCollection.addValues(copy as Iterable<[string, Iterable<string>]>);
        // }
    }

    async comment() {
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

    async run() {
        this.copyChecker();
        await this.comment();
    }
}