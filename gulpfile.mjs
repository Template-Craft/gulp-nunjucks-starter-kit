/* eslint-disable no-undef */
/* eslint-disable n/no-unpublished-import */

//  --------------------------------------------------------------------------------
//   *
//   * В проекте используется Gulp + Webpack + Babel + Nunjucks
//   * Конфигурационный файл и все раннеры используют синтаксис ES6+
//   * больше информации о Babel    (https://babeljs.io/docs/en/)
//   * больше информации о Webpack  (https://webpack.js.org/concepts/)
//   * примеры конфигурации Webpack (https://webpack.js.org/configuration/)
//   * больше о Nunjucks            (https://mozilla.github.io/nunjucks/templating.html#template-inheritance)
//   *  --------
//   *  --------
//   * Это главный конфигурационный файл gulp сборщика, тут описываем/поделючаем как модули, задачи по запуску и сборке проекта.
//   * Gulp-раннер разделён на модули, каждый модуль отвечает за что-то своё.
//   * Модули-раннеры находятся в папке         -> /gulp/tasks
//   * Модули-конфигурации находятся в папке    -> /gulp/config
//   * Каталог в котором работаем с исходниками -> /src
//   * Каталог в котором собирается проект      -> /build
//   *
//   *  Copyright (c) 2023-2026 NИ
//  --------------------------------------------------------------------------------

'use strict';

import nodePath from 'node:path';

import gulp from 'gulp';

// Импорт путей
import { path } from './gulp/config/path.mjs';
import { settings } from './gulp/config/settings.mjs';

// Импорт общих плагинов
import { plugins } from './gulp/config/plugins.mjs';

// Импорт информации о пакете
import { pkg } from './gulp/config/pkg.mjs';

// Импорт обработчика ошибок
import { errors } from './gulp/config/errors.mjs';

// Импорт задач
import { reset } from './gulp/tasks/reset.mjs';
import { server } from './gulp/tasks/server.mjs';
import { templates } from './gulp/tasks/templates.mjs';
import { styles } from './gulp/tasks/styles.mjs';
import { scripts } from './gulp/tasks/scripts.mjs';
import { fonts } from './gulp/tasks/fonts.mjs';
import { images } from './gulp/tasks/images.mjs';
import { vendors } from './gulp/tasks/packages.mjs';
import { monitor } from './gulp/tasks/monitor.mjs';

// Оповещения
import { createNotification, send as notifySend } from './gulp/tasks/notify.mjs';

// Кэш зависимостей
import { buildDependencyMap } from './gulp/utils/buildDependencyMap.mjs';
import { setDependencyCache } from './gulp/utils/dependencyCache.mjs';
import { updateDependencyMap } from './gulp/utils/updateDependencyMap.mjs';
import { getSectionNameFromPath } from './gulp/utils/getSectionName.mjs';

// Передаём значения в глобальную переменную app
global.app = {
  isBuild: process.argv.includes('--build'), // -> Проверяем режим продакшена
  isDev: !process.argv.includes('--build'), // -> Проверяем режим разработки
  path: path,
  gulp: gulp,
  plugins: plugins,
  errors: errors,
  pkg: pkg,
};

// Автосоздание кэша и карты зависимостей при старте (для nunjucks)
async function initDependencyCacheIfNeeded() {
  if (!settings.cache.autoRebuild) return;

  console.log(`[${app.plugins.chalk.magenta('Cache')}] Инициализация кэша зависимостей...`);

  const result = await buildDependencyMap({
    includeComponents: true,
    includeSections: true,
    includeTemplates: true,
  });

  setDependencyCache(result);
}

// функция наблюдатель
function watcher() {
  // Отслеживаем изменения nunjucks компонентов и json данных
  gulp.watch([path.watch.nunjucksData, path.watch.nunjucks]).on('change', async (filePath) => {
    console.log(`[${app.plugins.chalk.blue('Nunjucks watcher')}] Changed:`, app.plugins.chalk.magenta(filePath));

    // Унифицированная нормализация
    const normalized = filePath.replace(/\\/g, '/');
    const isComponent = normalized.includes('/components/');
    const isSection = normalized.includes('/sections/');
    const isTemplate = normalized.includes('/templates/');

    const name = isComponent
      ? nodePath.basename(nodePath.dirname(filePath))
      : isSection
        ? getSectionNameFromPath(filePath)
        : isTemplate
          ? nodePath.basename(filePath, '.njk')
          : null;

    // Инкрементальное обновление dependencyMap
    if (name) {
      await updateDependencyMap({
        type: isComponent ? 'component' : isSection ? 'section' : 'template',
        name: name,
      });
    }

    // Триггерим шаблоны (точечная/полная пересборка определяется внутри)
    templates(filePath);
  });

  gulp.watch(path.watch.styles).on('change', (filePath) => {
    console.log(`[${app.plugins.chalk.blue('SASS watcher')}] Changed:`, app.plugins.chalk.magenta(filePath));

    // Триггерим стили
    styles(filePath);
  });

  gulp.watch(path.watch.scripts, scripts);
  gulp.watch(path.watch.images, images);
}

// gulp.parallel() - параллельное выполнение задач
// gulp.series()   - последовательное выполнение задач

// передаём сюда свои задачи (task)
const mainTasks = gulp.parallel(vendors, styles, templates, scripts, fonts, images);

// const failstart = () => {
//   throw new Error('Тестовая фатальная ошибка старта');
// };

const dev = (callback) => {
  const run = gulp.series(
    reset,
    // failstart,
    // создаём кэш зависимостей при старте сборки
    initDependencyCacheIfNeeded,
    mainTasks,
    gulp.parallel(watcher, server, monitor),
  );

  run((error) => {
    if (error) {
      // Сбой при старте -> выводим ошибку в оповещениях
      notifySend('Gulp ошибка старта', error.message ?? String(error), 4);
      return callback(error);
    }

    // Успешный запуск
    return callback();
  });
};

const build = (callback) => {
  const run = gulp.series(
    reset,
    // failstart,
    mainTasks,
  );

  run((error) => {
    if (error) {
      // Сбой при старте -> выводим ошибку в оповещениях
      notifySend('Gulp ошибка сборки', error.message ?? String(error), 4);
      return callback(error);
    }

    // Успешный запуск -> приветственный баннер
    createNotification();
    return callback();
  });
};

// Экспорт сценариев:
export { dev, build };

// Выполнение сценария по умолчанию
gulp.task('default', dev);
