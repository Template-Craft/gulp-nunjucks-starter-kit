#!/usr/bin/env node

/* eslint-disable n/no-unpublished-import */

'use strict';

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

// Команды и опции
import { COMMANDS } from './commandsRegister.mjs';
import { OPTIONS } from './options/options.mjs';

const yarg = yargs(hideBin(process.argv));

// запуск нашей программы
const RUNCLI = () => {
  return yarg
    .usage('Usage: $0 <command> [option]')
    .demandCommand(1)
    .version('1.0.0')
    .alias('version', 'v')
    .command(COMMANDS)
    .option(OPTIONS)
    .help(false)
    .parse();
};

RUNCLI();
