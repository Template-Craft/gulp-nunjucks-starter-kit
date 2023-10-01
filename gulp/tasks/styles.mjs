/* eslint-disable n/no-unpublished-import */
/* eslint-disable import/order */

//  -------------------------------------------------------------;
//    Таск-раннер для компиляции scss/sass файлов в обычный css
//  -------------------------------------------------------------;

'use strict';

// Импортируем необходимые библиотеки:
import dartSass from 'sass';
import gulpSass from 'gulp-sass';

import autoprefixer from 'gulp-autoprefixer';
import groupCssMediaQueries from 'gulp-group-css-media-queries';
import sourcemaps from 'gulp-sourcemaps';
import mincss from 'gulp-clean-css';

import rename from 'gulp-rename';

const sass = gulpSass(dartSass);

/* global app */
export const styles = () => {
  return app.gulp
    .src(app.path.src.styles)
    .pipe(app.plugins.gulpIf(app.isDev, sourcemaps.init()))
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: 'SCSS',
          sound: false,
          message: 'Error: <%= error.message %>',
        }),
      ),
    )
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(groupCssMediaQueries())
    .pipe(
      autoprefixer({
        cascade: true,
        grid: true,
        overrideBrowserslist: ['last 6 versions'],
      }),
    )
    .pipe(
      app.plugins.gulpIf(
        app.isBuild,
        mincss({
          compatibility: 'ie8',
          level: {
            1: {
              specialComments: 0,
              removeEmpty: true,
              removeWhitespace: true,
            },
            2: {
              mergeMedia: true,
              removeEmpty: true,
              removeDuplicateFontRules: true,
              removeDuplicateMediaBlocks: true,
              removeDuplicateRules: true,
              removeUnusedAtRules: false,
            },
          },
        }),
      ),
    )
    .pipe(
      app.plugins.gulpIf(
        app.isBuild,
        rename({
          suffix: '.min',
        }),
      ),
    )
    .pipe(app.plugins.plumber.stop())
    .pipe(app.plugins.gulpIf(app.isDev, sourcemaps.write('./maps/')))
    .pipe(app.gulp.dest(app.path.build.styles))
    .pipe(app.plugins.browsersync.stream());
};
