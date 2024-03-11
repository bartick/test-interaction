import * as core from '@actions/core';
import * as github from '@actions/github';
import { GitHub } from '@actions/github/lib/utils'

import { GithubIssue } from './issue';
import { GithubPR } from './pr';

/**
 * The main function in the TypeScript code snippet checks for opened issues or pull requests on GitHub
 * and creates a corresponding runner object to handle interactions.
 * @returns The `main` function is an asynchronous function that checks if an issue or pull request was
 * opened in a GitHub repository. If the event that triggered the action was not an issue or pull
 * request, it will log a message and skip further execution. If there is a sender in the context
 * payload, it will retrieve the sender's login information. It then creates an instance of either
 * `GithubIssue` or `GithubPR` and calls the `run` method on the instance.
 */
async function main() {
  /* This line of code is creating a `client` object that represents an instance of the `GitHub` class
  from the `@actions/github` library. It uses the `getOctokit` method provided by the `github`
  object to create this instance. The `getOctokit` method takes a token as an argument, which is
  retrieved from the GitHub Actions input using `core.getInput('token', { required: true })`. This
  token is required for authenticating and making API requests to the GitHub API. */
  const client: InstanceType<typeof GitHub> = github.getOctokit(core.getInput('token', { required: true }));
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
  const isIssue: boolean = !!context.payload.issue;
  if (!isIssue && !context.payload.pull_request) {
    console.log(
      'The event that triggered this action was not a pull request or issue, skipping.'
    );
    return;
  }

  console.log('Checking for existing interactions');
  if (!context.payload.sender) {
    throw new Error('Internal error, no sender provided by GitHub');
  }
  
  /* The line is extracting the login
  information of the sender who triggered the GitHub event. */
  const sender: string = context.payload.sender!.login;
  
  /* The line is extracting information about the GitHub repository and the specific
  issue or pull request that triggered the workflow from the `context` object. */
  const issue: {owner: string; repo: string; number: number} = context.issue;

  let runner: GithubIssue | GithubPR;

  if (isIssue) {
    runner = new GithubIssue(client, issue, sender);
  } else {
    runner = new GithubPR(client, issue, sender);
  }

  await runner.run();
}

async function run() {
  try {
    await main();
  } catch (error: any) {
    core.setFailed(error.message);
  }
}

run();