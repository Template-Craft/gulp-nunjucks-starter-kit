/* eslint-disable n/no-unpublished-import */
/* eslint-disable import/order */

//  -------------------------------------------------------------;
//    Таск-раннер для компиляции scss/sass файлов в обычный css
//  -------------------------------------------------------------;

'use strict';

// Импортируем необходимые библиотеки:
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';

import gulpPostCSS from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'autoprefixer';
import postCSSSortMediaQueries from 'postcss-sort-media-queries';
import cssnano from 'cssnano';
import sccnanoPresetAdvanced from 'cssnano-preset-advanced';

import rename from 'gulp-rename';

const sass = gulpSass(dartSass);

/* global app */
export const styles = () => {
  const postCSSPlugins = [
    autoprefixer({
      cascade: true,
      grid: true,
      overrideBrowserslist: ['last 6 versions'],
    }),
    postCSSSortMediaQueries({
      sort: 'desktop-first',
    }),
    cssnano({
      preset: [
        sccnanoPresetAdvanced,
        {
          discardComments: true,
          autoprefixer: false,
          calc: false,
          discardUnused: false,
          discardDuplicates: true,
          discardEmpty: true,
          mergeIdents: false,
          mergeLonghand: true,
          mergeRules: true,
          minifyFontValues: true,
          minifyGradients: true,
          minifySelectors: true,
          normalizeCharset: true,
          normalizeWhitespace: true,
          orderedValues: true,
          uniqueSelectors: true,
        },
      ],
    }),
  ];

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
    .pipe(gulpPostCSS(postCSSPlugins))
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
