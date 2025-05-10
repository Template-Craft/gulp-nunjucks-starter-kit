#!/usr/bin/env node
/* eslint-disable n/no-unpublished-import */

/**
 * Читайте документацию по yargs API, по ссылке ниже
 * https://yargs.js.org/docs/
 */

'use strict';

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const yargApp = yargs(hideBin(process.argv));

import { COMMANDS } from './commands/index.mjs';
import { GLOBALOPTIONS } from './options/global.mjs';

yargApp
  .version('1.1.0')
  .alias('v', 'version')
  .usage('Usage: $0 <command> [option]')
  .command(COMMANDS)
  .option(GLOBALOPTIONS)
  .demandCommand()
  .recommendCommands()
  .strict(true) // -> Любой аргумент командной строки, который не требуется или не имеет соответствующего описания, будет сообщен как ошибка.
  .wrap(yargApp.terminalWidth()) // -> максимизируем ширину инструкций для красивого вывода справки
  .help()
  .alias('h', 'help')
  .parse();
