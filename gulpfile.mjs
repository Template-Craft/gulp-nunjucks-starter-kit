'use strict'

// eslint-disable-next-line n/no-unpublished-import
import gulp from 'gulp'

// Импорт путей
import { path } from './gulp/config/path.mjs'

// Импорт задач
import { copy } from './gulp/tasks/copy.mjs'
import { reset } from './gulp/tasks/reset.mjs'

// Передаём значения в глобальную переменную
global.app = {
  path: path,
  gulp: gulp,
}

// функция наблюдатель
function watcher() {
  gulp.watch(path.watch.files, copy)
}

// Построение сценариев выполнения задач
const dev = gulp.series(reset, copy, watcher)

// Выполнение сценария по умолчанию
gulp.task('default', dev)
