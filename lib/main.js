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
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = github.getOctokit(core.getInput('token', { required: true }));
        const context = github.context;
        console.log(Object.keys(process.env));
        for (const [key, value] of Object.entries(process.env)) {
            if (key.startsWith("INPUT_MESSAGE"))
                console.log(`${key}: ${value}`);
        }
        return;
        if (context.payload.action !== 'opened') {
            console.log('No issue or PR was opened, skipping');
            return;
        }
        const isIssue = !!context.payload.issue;
        if (!isIssue && !context.payload.pull_request) {
            console.log('The event that triggered this action was not a pull request or issue, skipping.');
            return;
        }
        console.log('Checking for existing interactions');
        if (!context.payload.sender) {
            throw new Error('Internal error, no sender provided by GitHub');
        }
        const sender = context.payload.sender.login;
        const issue = context.issue;
        let runner;
        if (isIssue) {
            runner = new issue_1.GithubIssue(client, issue, sender);
        }
        else {
            runner = new issue_1.GithubIssue(client, issue, sender);
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
