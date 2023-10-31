/* eslint-disable n/no-unpublished-import */
/* eslint-disable camelcase */

'use strict';
import fs from 'fs';
import nodePath from 'node:path';

import chalk from 'chalk';

export const UTILSCONFIG = {
  template: {
    extension: '.njk',
    data_dir: './src/views/data/',
    spawn_dir: function (value) {
      return `./src/views/components/${value}/`;
    },
  },
  styles: {
    extension: '.scss',
    component_path: './src/views/components/',
    include_in: './src/styles/_components_import.scss',
    component_stylesheet: function (dir_path, value) {
      return `${dir_path}/_${value}${this.extension}`;
    },
    import: function (value) {
      return `\n@import '../views/components/${value}/_${value}${this.extension}';\n`;
    },
  },
};

// @type function
// 1 аргументом передаём массив с коллекцией файлов
// 2 аргументом передаём путь до дир-рии, в которой создаём объекты
// @param: CREATE_FILES(collection, dir_path)
export const CREATE_FILES = (collection, dir_path) => {
  collection.forEach((file) => {
    fs.open(`${dir_path}${nodePath.basename(file)}`, 'w', (error_msg) => {
      if (error_msg) {
        console.error(chalk.red(error_msg));
      }

      console.info(chalk.green(`Файл компонента создан, и находится по пути: ${dir_path}${file}`));
    });
  });
};
