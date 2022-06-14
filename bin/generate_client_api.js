#!/usr/bin/env node
/* eslint-disable */

const { mkdir, rm } = require('fs/promises');
const os = require('os');
const { join, resolve } = require('path');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);
const chmodr = promisify(require('chmodr'));

const SOURCE_PATH = join(__dirname, '..');
const TARGET_PATH = process.argv[2];

const userInfo = os.userInfo();
const isWindows = os.platform() === 'win32';

async function main() {
  if (!TARGET_PATH) {
    throw new Error('TARGET_PATH is missing');
  }

  await rm(TARGET_PATH, { recursive: true, force: true });
  await mkdir(TARGET_PATH, { recursive: true });

  const { stdout, stderr } = await exec(
    `docker run --rm \
    ${isWindows ? '' : `--user "${userInfo.uid}:${userInfo.gid}"`} \
    -v "${SOURCE_PATH}:/local" \
    -v "${resolve(TARGET_PATH)}:/gen" \
    openapitools/openapi-generator-cli:v5.3.0 \
    generate -i "https://dz-dialect-api.ew.r.appspot.com/v3/api-docs" -g typescript-angular --additional-properties=enumPropertyNaming=UPPERCASE,serviceSuffix=HttpService,fileNaming=kebab-case -o /gen`,
  );
  if (stderr) {
    console.error(stderr);
  } else {
    console.log(stdout);
  }
  await chmodr(TARGET_PATH, 0755);
}

main().catch((err) => console.error(err));
