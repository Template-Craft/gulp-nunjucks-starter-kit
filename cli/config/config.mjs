/* eslint-disable n/no-unpublished-import */
/* eslint-disable camelcase */

'use strict';

import fs from 'fs';
import node_path from 'node:path';

import archiver from 'archiver';
import chalk from 'chalk';

const __dirname = node_path.resolve();

// часто используемые плагины
export const KITPLUGIN = {
  fs: fs,
  chalk: chalk,
  archiver: archiver,
  node_path: node_path,
  __dirname: __dirname,
};

export const KITCONFIG = {
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
  archive: [
    {
      options: {
        mode: 'tgz',
        extension: 'tar.gz',
        option: KITPLUGIN.archiver('tar', {
          gzip: true,
          gzipOptions: { level: 1 },
        }),
      },
    },
    {
      options: {
        mode: 'tar',
        extension: 'tar',
        option: KITPLUGIN.archiver('tar'),
      },
    },
    {
      options: {
        mode: 'zip',
        extension: 'zip',
        option: KITPLUGIN.archiver('zip'),
      },
    },
  ],
};

// @type function
// 1 аргументом передаём массив с коллекцией файлов
// 2 аргументом передаём путь до дир-рии, в которой создаём объекты
// @param: CREATE_FILES(collection, dir_path)
export const CREATE_FILES = (collection, dir_path) => {
  collection.forEach((file) => {
    KITPLUGIN.fs.open(`${dir_path}${KITPLUGIN.node_path.basename(file)}`, 'w', (error_msg) => {
      if (error_msg) {
        console.error(KITPLUGIN.chalk.red(error_msg));
      }

      console.info(KITPLUGIN.chalk.green(`Файл компонента создан, и находится по пути: ${dir_path}${file}`));
    });
  });
};

// @type function
// функция создания архива, передаем в неё 3 параметра:
// 1 - коллекцию объектов массива с параметрами для архиватора
// 2 - опцию о расширении архива {tgz, tar, zip} (получаем из консоли)
// 3 - имя директории, так-же получаем из консоли (то что ввёл пользователь)
export const CREATE_ARCHIVE = (archive_option_collection, input_option, input_values) => {
  try {
    // в цикле перебираем массив с коллекцией объектов опций для архиватора
    archive_option_collection.forEach((collection) => {
      // ищем совпадение в массиве объектов с тем, что пришло от пользователя в консоли
      const item_compare = collection.options.mode.includes(input_option);

      // проверяем результат
      if (item_compare) {
        // debug mode
        console.log(
          item_compare
            ? `Успешное сравнение: ${KITPLUGIN.chalk.green(
                item_compare,
              )} - совпадает со значением пришедшим из консоли, перехожу к созданию архива...`
            : `Неудачное сравнение: ${KITPLUGIN.chalk.red(
                item_compare,
              )} - не совпадает со значением пришедшим из консоли, останавливаю работу.`,
        );

        const extension = collection.options.extension;
        const archive_option = collection.options.option;

        const get_date = new Date().toISOString();

        const destination = `${input_values}:${get_date}.${extension}`;
        const destination_stream = KITPLUGIN.fs.createWriteStream(destination);

        destination_stream.on('close', function () {
          console.log(KITPLUGIN.chalk.yellow(archive_option.pointer() + ' total bytes'));
          console.log('Архиватор был завершен, и дескриптор выходного файла закрылся.\nАрхив успешно создан.');
        });

        archive_option.on('error', function (err) {
          throw err;
        });

        archive_option.pipe(destination_stream);

        archive_option.directory(input_values);
        archive_option.finalize();
      }
    });
  } catch (error) {
    console.error(error);
  }
};
