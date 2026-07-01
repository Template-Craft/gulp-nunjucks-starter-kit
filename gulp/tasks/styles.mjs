/* eslint-disable n/no-unpublished-import */

//  -------------------------------------------------------------;
//    Таск-раннер для компиляции scss/sass файлов в обычный css
//  -------------------------------------------------------------;

'use strict';

// Импортируем необходимые библиотеки:
import nodePath from 'node:path';

import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';

import gulpPostCSS from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import postCSSSortMediaQueries from 'postcss-sort-media-queries';
import cssnano from 'cssnano';
import sccnanoPresetAdvanced from 'cssnano-preset-advanced';

const sass = gulpSass(dartSass);

/**
 * Компилирует только `main.scss`, если изменённый файл:
 * - это не partial
 * - или он входит в директорию `src/assets/styles/**`
 */

/* global app */
export const styles = async (changedFile = null) => {
  const postCSSPlugins = [
    autoprefixer({
      cascade: true,
      grid: true,
      // overrideBrowserslist: ['last 6 versions'],
      env: 'stylesheets',
    }),
    postCSSSortMediaQueries({
      sort: 'desktop-first',
    }),
    ...(app.isBuild
      ? [
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
        ]
      : []),
  ];

  // Gulp может передать функцию done, игнорируем её
  if (typeof changedFile === 'function') {
    changedFile = null;
  }

  // Инициализация запуска
  const isInitialRun = !changedFile;

  if (app.isDev && isInitialRun) {
    console.log(`[${app.plugins.chalk.blue('SASS')}] Инициализация сборки main.scss`);
  }

  let changedBase = '';
  let normalizedPath = '';

  // если передали не строку (а событие), достаём путь
  if (!isInitialRun && typeof changedFile !== 'string') {
    changedBase = nodePath.basename(changedFile);
    normalizedPath = changedFile.replace(/\\/g, '/');
  }

  const isPartial = (file) => typeof file === 'string' && nodePath.basename(file).startsWith('_');

  // Оптимизация: пропускаем пересборку, если файл не SCSS
  if (!isInitialRun && !changedFile?.endsWith('.scss')) {
    // return Promise.resolve();
    return;
  }

  // Проверка: нужно ли пересобирать
  const shouldRecompile =
    isInitialRun ||
    changedBase === 'main.scss' ||
    isPartial(changedFile) ||
    normalizedPath.includes('/components/') ||
    normalizedPath.includes('/defaults/') ||
    normalizedPath.includes('/main/');

  // if (!shouldRecompile) return Promise.resolve();
  if (!shouldRecompile) return;

  return (
    app.gulp
      .src(app.path.src.styles, {
        sourcemaps: app.plugins.gulpIf(app.isDev, true),
        allowEmpty: true,
      })
      // ловим ошибки, и выводим их в консоль и в систему
      .pipe(
        app.plugins.plumber({
          errorHandler: function (error) {
            app.errors.handler(error, app.errors.messages.sass);

            // console.log(error.toString()); // => можно не выводить, т.к. ошибки логирует sass
          },
        }),
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
      .pipe(app.plugins.browsersync.stream({ match: `${app.path.build.styles}/*.css` })) // точечный HRM
  );
};
