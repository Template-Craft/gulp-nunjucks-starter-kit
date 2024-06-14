/* eslint-disable import/order */
/* eslint-disable n/no-unpublished-import */

//  -----------------------------------------------------------------------------;
//    Здесь мы импортируем все повторяющиеся плагины,
//    далее передаём их в объект plugins, не забываем указать что
//    объект теперь экспортируемый, далее в любом файле вызываем нужный плагин:
//    plugins.pluginName
//  -----------------------------------------------------------------------------;

'use strict';

// Общие плагины
import browsersync from 'browser-sync';

import notify from 'gulp-notify';
import plumber from 'gulp-plumber';
import replace from 'gulp-replace';
import rename from 'gulp-rename';
import beautify from 'gulp-beautify';
import gulpIf from 'gulp-if';

// собираем тут все общие плагины
export const plugins = {
  replace: replace,
  rename: rename,
  plumber: plumber,
  notify: notify,
  browsersync: browsersync,
  beautify: beautify,
  gulpIf: gulpIf,
};
