import * as core from '@actions/core';
import * as github from '@actions/github';
import { GitHub } from '@actions/github/lib/utils'

import { GithubIssue } from './issue';

async function main() {
  const client: InstanceType<typeof GitHub> = github.getOctokit(core.getInput('token', { required: true }));
  const context = github.context;

  console.log(Object.keys(process.env));

  for(const [key, value] of Object.entries(process.env)) {
    if(key.startsWith("INPUT_MESSAGE"))
      console.log(`${key}: ${value}`);
  }
  return;

  if (context.payload.action !== 'opened') {
    console.log('No issue or PR was opened, skipping');
    return;
  }

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
  
  const sender: string = context.payload.sender!.login;
  const issue: {owner: string; repo: string; number: number} = context.issue;

  let runner: GithubIssue;

  if (isIssue) {
    runner = new GithubIssue(client, issue, sender);
  } else {
    runner = new GithubIssue(client, issue, sender);
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