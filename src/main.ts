import * as core from '@actions/core';
// import * as github from '@actions/github';
// import { GitHub } from '@actions/github/lib/utils'

async function main() {
  const issue = core.getInput('issue');
  console.log(issue);
}

async function run() {
  try {
    await main();
  } catch (error: any) {
    core.setFailed(error.message);
  }
}

run();