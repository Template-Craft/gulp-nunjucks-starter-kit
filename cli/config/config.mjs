/* eslint-disable n/no-unpublished-import */
/* eslint-disable camelcase */

'use strict';

import fs from 'fs';
import node_path from 'node:path';

import archiver from 'archiver';
import chalk from 'chalk';

const __dirname = node_path.resolve();

// часто используемые плагины
export const PLUGIN = {
  fs: fs,
  chalk: chalk,
  archiver: archiver,
  node_path: node_path,
  __dirname: __dirname,
};

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
    import_stylesheet: function (value) {
      return `\n@import '../views/components/${value}/_${value}${this.extension}';\n`;
    },
  },
  archive: {
    tgz: {
      extension: 'tar.gz',
      option: PLUGIN.archiver('tar', {
        gzip: true,
        gzipOptions: { level: 1 },
      }),
    },
    tar: {
      extension: 'tar',
      option: PLUGIN.archiver('tar'),
    },
    zip: {
      extension: 'zip',
      option: PLUGIN.archiver('zip'),
    },
  },
};

// @type function
// 1 аргументом передаём массив с коллекцией файлов
// 2 аргументом передаём путь до дир-рии, в которой создаём объекты
// @param: CREATE_FILES(collection, dir_path)
export const CREATE_FILES = (collection, dir_path) => {
  collection.forEach((file) => {
    PLUGIN.fs.open(`${dir_path}${PLUGIN.node_path.basename(file)}`, 'w', (error_msg) => {
      if (error_msg) {
        console.error(PLUGIN.chalk.red(error_msg));
      }

      console.info(PLUGIN.chalk.green(`Файл компонента создан, и находится по пути: ${dir_path}${file}`));
    });
  });
};

// @type function
// 1 аргумент передаём опции архиватора (массив или строка)
// 2 аргумент передаём значение пришедшее от ввода пользователя
// 3 аргумент передаём расширение архива
// CREATE_ARCHIVE(options, values);
export const CREATE_ARCHIVE = (archive_option, input_values, destination_extension) => {
  const get_date = new Date().toISOString();

  const destination = `${input_values}:${get_date}.${destination_extension}`;
  const destination_stream = PLUGIN.fs.createWriteStream(destination);

  destination_stream.on('close', function () {
    console.log(PLUGIN.chalk.yellow(archive_option.pointer() + ' total bytes'));
    console.log('Архиватор был завершен, и дескриптор выходного файла закрылся.\nАрхив успешно создан.');
  });

  archive_option.on('error', function (err) {
    throw err;
  });

  archive_option.pipe(destination_stream);

  archive_option.directory(input_values);
  archive_option.finalize();
};
