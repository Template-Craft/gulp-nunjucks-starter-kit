'use strict'

// eslint-disable-next-line n/no-unpublished-import
import gulp from 'gulp'

// Импорт путей
import { path } from './gulp/config/path.mjs'

// Импорт задач
import { copy } from './gulp/tasks/copy.mjs'

// Передаём значения в глобальную переменную
global.app = {
  path: path,
  gulp: gulp,
}

// функция наблюдатель
function watcher() {
  gulp.watch(path.watch.files, copy)
}

// Построение сценарием выполнения задач
const dev = gulp.series(copy, watcher)

// Выполнение сценария по умолчанию
gulp.task('default', dev)
