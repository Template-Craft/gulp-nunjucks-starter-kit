/* eslint-disable n/no-unpublished-import */
/* eslint-disable camelcase */

'use strict';
import fs from 'fs';
import nodePath from 'node:path';

import chalk from 'chalk';

export const UTILSCONFIG = {
  template: {
    template_extension: '.njk',
    data_dir: './src/views/data/',
    spawn_dir: function (value) {
      return `./src/views/components/${value}/`;
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

      console.info(chalk.green(`Файлы компонентов созданы: ${file}`));
    });
  });
};
