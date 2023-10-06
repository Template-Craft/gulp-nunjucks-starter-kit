// Импортируем команды тут, ниже объединяем их в глобальную переменную COMMANDS

import * as create from './commands/create.mjs';
import * as inject from './commands/inject.mjs';

export const COMMANDS = [create, inject];
