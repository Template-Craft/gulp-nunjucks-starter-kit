/* eslint-disable import/order */
/* eslint-disable camelcase */

// Импортируем команды тут, ниже объединяем их в глобальную переменную COMMANDS

import * as create from './commands/create.mjs';
import * as inject from './commands/inject.mjs';
import * as archive_this from './commands/archive_this.mjs';

export const COMMANDS = [create, inject, archive_this];
