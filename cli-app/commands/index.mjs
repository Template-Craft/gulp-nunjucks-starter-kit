// Экспортируем все команды

import * as createComponent from './createComponent.mjs';
import * as injectComponentStyle from './injectComponentStyle.mjs';
import * as createArchive from './createArchive.mjs';
import * as base64Converter from './base64Converter.mjs';
import * as imagemin from './imagemin.mjs';

export const COMMANDS = [createComponent, injectComponentStyle, createArchive, base64Converter, imagemin];
