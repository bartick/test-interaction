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
exports.GithubIssue = void 0;
const core = __importStar(require("@actions/core"));
const customMap_class_1 = require("./utils/customMap.class");
class GithubIssue {
    constructor(client, issue, sender) {
        this.client = client;
        this.owner = issue.owner;
        this.repo = issue.repo;
        this._number = issue.number;
        this._sender = sender;
        this.messageCollection = this.messageParser();
    }
    messageParser() {
        const message = core.getInput('issue-message');
        const messageCollection = new customMap_class_1.Collection();
        messageCollection.parseMessage(message);
        return messageCollection;
    }
    copyParser() {
        const copy = core.getInput('issue-copy');
        if (!copy) {
            return;
        }
    }
    comment() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(this.messageCollection);
            console.log(this._number.toString());
            const message = this.messageCollection.get(this._number.toString());
            if (!message) {
                console.log('Issue not mentioned in config, skipping');
                return;
            }
            yield this.client.rest.issues.createComment({
                owner: this.owner,
                repo: this.repo,
                issue_number: this._number,
                body: message,
            });
        });
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.comment();
        });
    }
}
exports.GithubIssue = GithubIssue;
