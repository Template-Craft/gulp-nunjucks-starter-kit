/* eslint-disable n/no-unpublished-import */

//  -----------------------------------------------------------------------------;
//    Распарсиваем некоторую информацию из package.json,
//    для дальнейшей работы с ней в рамках некоторых фун-ций.
//  -----------------------------------------------------------------------------;

import os from 'node:os';
import fs from 'node:fs';

import nodePath from 'node:path';
const __dirname = nodePath.resolve();

import chalk from 'chalk';

//  Импортируем и парсим package.json
const myPkg = JSON.parse(fs.readFileSync(nodePath.resolve(__dirname, './package.json'), 'utf-8'));

const devMode = !process.argv.includes('--build');

export const pkg = {
  appName: myPkg.name.replaceAll('-', ' '),
  appVersion: chalk.bold(myPkg.version),
  appLicense: chalk.bold(myPkg.license),
  os: chalk.yellow(os.type),
  arch: chalk.blue(os.arch),
  platform: chalk.blue(os.platform),
  runtimeVersion: chalk.green(process.env.npm_config_user_agent),
  mode: chalk.green(devMode ? 'Development' : 'Production'),
  informerHeader: chalk.dim(
    `############ * ${chalk.hex('#94345c').bold(myPkg.name.replaceAll('-', ' '))} * ############`,
  ),
  informderFooter: chalk.dim(`############ * ${chalk.hex('#94345c').bold('/End')} * ############`),
  titleColor: function (title) {
    return chalk.hex('#24b153').bold(title);
  },
};
