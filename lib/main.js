"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const github = __importStar(require("@actions/github"));
const issue_1 = require("./issue");
const pr_1 = require("./pr");
/**
 * The main function in the TypeScript code snippet checks for opened issues or pull requests on GitHub
 * and creates a corresponding runner object to handle interactions.
 * @returns The `main` function is an asynchronous function that checks if an issue or pull request was
 * opened in a GitHub repository. If the event that triggered the action was not an issue or pull
 * request, it will log a message and skip further execution. If there is a sender in the context
 * payload, it will retrieve the sender's login information. It then creates an instance of either
 * `GithubIssue` or `GithubPR` and calls the `run` method on the instance.
 */
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        /* This line of code is creating a `client` object that represents an instance of the `GitHub` class
        from the `@actions/github` library. It uses the `getOctokit` method provided by the `github`
        object to create this instance. The `getOctokit` method takes a token as an argument, which is
        retrieved from the GitHub Actions input using `core.getInput('token', { required: true })`. This
        token is required for authenticating and making API requests to the GitHub API. */
        const client = github.getOctokit(core.getInput('token', { required: true }));
        const context = github.context;
        /* The `if (context.payload.action !== 'opened')` condition in the TypeScript code snippet is
        checking if the action that triggered the GitHub workflow was not an "opened" action. If the
        action is not an "opened" action (meaning an issue or pull request was not opened), the code logs
        a message saying "No issue or PR was opened, skipping" and then exits the function by using the
        `return` statement. This helps the code to skip further execution if the event that triggered the
        action was not related to opening an issue or pull request. */
        if (context.payload.action !== 'opened') {
            console.log('No issue or PR was opened, skipping');
            return;
        }
        /* The code is checking whether the event that triggered the GitHub workflow is
        related to an issue or a pull request. Here's a breakdown of what the code is doing: */
        const isIssue = !!context.payload.issue;
        if (!isIssue && !context.payload.pull_request) {
            console.log('The event that triggered this action was not a pull request or issue, skipping.');
            return;
        }
        console.log('Checking for existing interactions');
        if (!context.payload.sender) {
            throw new Error('Internal error, no sender provided by GitHub');
        }
        /* The line is extracting the login
        information of the sender who triggered the GitHub event. */
        const sender = context.payload.sender.login;
        /* The line is extracting information about the GitHub repository and the specific
        issue or pull request that triggered the workflow from the `context` object. */
        const issue = context.issue;
        let runner;
        if (isIssue) {
            runner = new issue_1.GithubIssue(client, issue, sender);
        }
        else {
            runner = new pr_1.GithubPR(client, issue, sender);
        }
        yield runner.run();
    });
}
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield main();
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();
