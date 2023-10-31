//  ----------------------------------------------------------------------------------------;
//    Таск-раннер для подключения, обработки и конкатинации js и css сторонних плагинов,
//    необходимых для для проекта.
//  ---------------------------------------------------------------------------------------;

/* eslint-disable n/no-unpublished-import */
/* eslint-disable no-undef */
'use strict';

import cssnano from 'cssnano';
import gulpConcat from 'gulp-concat';
import gulpPostCSS from 'gulp-postcss';

// Собираем, и конкатинируем js библиотеки
export const packagesJs = () => {};

// Собираем, и конкатинируем css библиотеки
export const packageCss = () => {
  // коллекция плагинов
  // подключаем необходимые css плагины в этом массиве,
  // пример: [`${app.path.nodeModules}/pathToPlugin/plugin.css`]
  const cssLibsCollection = [`${app.path.nodeModules}/normalize.css/normalize.css`];

  return app.gulp
    .src(cssLibsCollection)
    .pipe(app.plugins.gulpIf(app.isDev, app.plugins.sourcemaps.init()))
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: 'CSS vendor package',
          sound: false,
          message: 'Error: <%= error.message %>',
        }),
      ),
    )
    .pipe(
      gulpPostCSS([
        cssnano({
          preset: [
            'default',
            {
              discardComments: true,
            },
          ],
        }),
      ]),
    )
    .pipe(gulpConcat('vendor.css'))
    .pipe(
      app.plugins.gulpIf(
        app.isBuild,
        app.plugins.rename({
          suffix: '.min',
        }),
      ),
    )
    .pipe(app.plugins.plumber.stop())
    .pipe(app.plugins.gulpIf(app.isDev, app.plugins.sourcemaps.write('./maps/')))
    .pipe(app.gulp.dest(app.path.build.styles));
};
