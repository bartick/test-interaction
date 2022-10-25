import * as core from '@actions/core';
// import * as github from '@actions/github';
// import { GitHub } from '@actions/github/lib/utils'

import { Collection } from './utils/customMap.class';

async function main() {
  const issue = core.getInput('issue');
  const issueMapping: Collection<string, string> = new Collection(issue);
  console.log(issueMapping);
  console.log(issueMapping.get('1'));
}

async function run() {
  try {
    await main();
  } catch (error: any) {
    core.setFailed(error.message);
  }
}

run();