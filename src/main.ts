import * as core from '@actions/core';
// import * as github from '@actions/github';
// import { GitHub } from '@actions/github/lib/utils'

async function main() {
  const issue = core.getInput('issue');
  const issueKeyPair: string[][] = issue.split('\n').map((i) => i.split(':').map((j) => j.trim()));
  const issueMapping = new Map(issueKeyPair as Iterable<[string, string]>);
  console.log(issueMapping);
}

async function run() {
  try {
    await main();
  } catch (error: any) {
    core.setFailed(error.message);
  }
}

run();