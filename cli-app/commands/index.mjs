// Экспортируем все команды

import * as create from './create.mjs';
import * as inject from './inject.mjs';
import * as archive_this from './archive_this.mjs';
import * as convert from './converter.mjs';
import * as imagemin from './imagemin.mjs';

export const COMMANDS = [create, inject, archive_this, convert, imagemin];
