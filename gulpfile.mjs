'use strict'

import gulp from 'gulp'

// Импорт путей
import { path } from './gulp/config/path.mjs'

// Передаём значения в глобальную переменную
global.app = {
  path: path,
  gulp: gulp,
}

// Импорт задач
import { copy } from './gulp/tasks/copy.mjs'

// Выполнение сценария по умолчанию
gulp.task('default', copy)
