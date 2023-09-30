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
  gulp.watch(path.watch.styles, scripts);
  gulp.watch(path.watch.images, images);
}

// gulp.parallel() - параллельное выполнение задач
// передаём сюда свои задачи (task)
const mainTasks = gulp.parallel(templates, styles, scripts, fonts, images);

// gulp.series()   - последовательное выполнение задач
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);

// Экспорт сценариев:
export { dev };
export { build };

// Выполнение сценария по умолчанию
gulp.task('default', dev);
