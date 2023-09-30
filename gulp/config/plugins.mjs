/* eslint-disable import/order */
/* eslint-disable n/no-unpublished-import */
'use strict';

// Общие плагины
import browsersync from 'browser-sync';

import notify from 'gulp-notify';
import plumber from 'gulp-plumber';
import replace from 'gulp-replace';
import beautify from 'gulp-beautify';
import gulpIf from 'gulp-if';

// собираем тут все общие плагины
export const plugins = {
  replace: replace,
  plumber: plumber,
  notify: notify,
  browsersync: browsersync,
  beautify: beautify,
  gulpIf: gulpIf,
};
