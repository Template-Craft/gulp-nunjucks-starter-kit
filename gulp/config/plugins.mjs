/* eslint-disable n/no-unpublished-import */

//  -----------------------------------------------------------------------------;
//    Здесь мы импортируем все повторяющиеся плагины,
//    далее передаём их в объект plugins, не забываем указать что
//    объект теперь экспортируемый, далее в любом файле вызываем нужный плагин:
//    plugins.pluginName
//  -----------------------------------------------------------------------------;

'use strict';

// Общие плагины
import plumber from 'gulp-plumber';
import browsersync from 'browser-sync';
import replace from 'gulp-replace';
import rename from 'gulp-rename';
import beautify from 'gulp-beautify';
import gulpIf from 'gulp-if';
import notifier from 'node-notifier';
import chalk from 'chalk';

// собираем тут все общие плагины
export const plugins = {
  plumber: plumber,
  replace: replace,
  rename: rename,
  browsersync: browsersync,
  beautify: beautify,
  gulpIf: gulpIf,
  notifier: notifier,
  chalk: chalk,
};
