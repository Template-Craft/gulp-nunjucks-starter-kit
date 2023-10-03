//  --------------------------------------------------------------------------------
//   * Главный конфигурационный файл gulpfile.babel.js
//   * В проекте используется Gulp + Webpack + Babel + Nunjucks
//   * Конфигурационный файл и все раннеры используют синтаксис ES6+
//   * больше информации о Babel    (https://babeljs.io/docs/en/)
//   * больше информации о Webpack  (https://webpack.js.org/concepts/)
//   * примеры конфигурации Webpack (https://webpack.js.org/configuration/)
//   * больше о Nunjucks            (https://mozilla.github.io/nunjucks/templating.html#template-inheritance)
//   *  --------
//   *  --------
//   * Это главный конфигурационный файл проекта, тут описываем задачи по запуску и сборке проекта.
//   * Gulp-раннер разделён на модули, каждый модуль отвечает за что-то своё.
//   * Модули-раннеры находятся в папке         -> /gulp/tasks
//   * Модули-конфигурации находятся в папке    -> /gulp/config
//   * Каталог в котором работаем с исходниками -> /src
//   * Каталог в котором собирается проект      -> /build
//   *
//   *  Copyright (c) 2023 NИ
//  --------------------------------------------------------------------------------

/* eslint-disable n/no-unpublished-import */
/* eslint-disable import/order */
// eslint-disable-next-line n/no-unpublished-import
'use strict';

import gulp from 'gulp';

// Импорт путей
import { path } from './gulp/config/path.mjs';

// Импорт общих плагинов
import { plugins } from './gulp/config/plugins.mjs';

// Импорт задач
import { reset } from './gulp/tasks/reset.mjs';
import { server } from './gulp/tasks/server.mjs';
import { templates, templatesData } from './gulp/tasks/templates.mjs';
import { styles } from './gulp/tasks/styles.mjs';
import { scripts } from './gulp/tasks/scripts.mjs';
import { fonts } from './gulp/tasks/fonts.mjs';
import { images } from './gulp/tasks/images.mjs';
import { packageCss } from './gulp/tasks/packages.mjs';

// Оповещения
import { modeStateNotifier } from './gulp/tasks/notify.mjs';

// Передаём значения в глобальную переменную
global.app = {
  isBuild: process.argv.includes('--build'), // -> Проверяем режим продакшена
  isDev: !process.argv.includes('--build'), // -> Проверяем режим разработки
  path: path,
  gulp: gulp,
  plugins: plugins,
};

// функция наблюдатель
function watcher() {
  gulp.watch(path.watch.nunjucks, templates);
  gulp.watch(path.watch.nunjucksData, gulp.parallel(templatesData, templates)).on('change', plugins.browsersync.reload);
  gulp.watch(path.watch.styles, styles);
  gulp.watch(path.watch.scripts, scripts);
  gulp.watch(path.watch.images, images);
}

// gulp.parallel() - параллельное выполнение задач
// передаём сюда свои задачи (task)
const mainTasks = gulp.parallel(templates, packageCss, styles, scripts, fonts, images);

// gulp.series()   - последовательное выполнение задач
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server, modeStateNotifier));
const build = gulp.series(reset, mainTasks, modeStateNotifier);

// Экспорт сценариев:
export { dev };
export { build };

// Выполнение сценария по умолчанию
gulp.task('default', dev);
