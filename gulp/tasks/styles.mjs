/* eslint-disable n/no-unpublished-import */

//  -------------------------------------------------------------;
//    Таск-раннер для компиляции scss/sass файлов в обычный css
//  -------------------------------------------------------------;

'use strict';

// Импортируем необходимые библиотеки:
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';

import gulpPostCSS from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import postCSSSortMediaQueries from 'postcss-sort-media-queries';
import cssnano from 'cssnano';
import sccnanoPresetAdvanced from 'cssnano-preset-advanced';

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
    .src(app.path.src.styles, { sourcemaps: app.plugins.gulpIf(app.isDev, true) })
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
        app.plugins.rename({
          suffix: '.min',
        }),
      ),
    )
    .pipe(app.plugins.plumber.stop())
    .pipe(app.gulp.dest(app.path.build.styles, { sourcemaps: app.plugins.gulpIf(app.isDev, './maps/') }))
    .pipe(app.plugins.browsersync.stream());
};
