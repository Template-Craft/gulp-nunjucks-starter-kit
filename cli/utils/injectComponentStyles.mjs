/* eslint-disable camelcase */
/* eslint-disable prefer-const */
/* eslint-disable n/no-unpublished-import */
/* eslint-disable import/order */

// Утилита для инъекции стилей компонента в главный файл стилей
// с помощью конструкции @import '';
'use strict';

import fs from 'fs';
// не забываем про остальных юзеров, интегрируем утилиту path
import path from 'path';
import chalk from 'chalk';

import { UTILSCONFIG } from '../config/config.mjs';
const config = UTILSCONFIG.styles;

const __dirname = path.resolve();

const injectStyle = async (style) => {
  try {
    const value = style; // переопределяем переменную, для красоты кода.

    const find_dir_path = `${config.component_path}${value}`;
    const this_stylesheet = config.component_stylesheet(find_dir_path, value);

    // ищем директорию с компонентом, имя получаем из командной строки.
    await fs.readdir(path.resolve(__dirname, find_dir_path), 'utf8', (err, files) => {
      if (err) {
        console.error(chalk.red(err)); // сообщаем ошибку в консоли
      } else {
        console.info(chalk.green(`Каталог существует и найден: ${find_dir_path}`));

        // в цикле перебираем файлы и выводим инфу в консоль.
        for (let file of files) {
          console.info(chalk.green(`\nФайлы компонента: ${file}`));
        }

        fs.stat(`${this_stylesheet}`, (error_msg, status) => {
          if (error_msg) {
            console.error(chalk.red(error_msg));
          }

          // Это файл?
          if (status.isFile()) {
            console.info(chalk.blue(`\n_${value}.scss - существует и является файлом`));

            // Добавим в конец main.scss, импорт файла стилей нашего найденного компонента
            fs.appendFile(config.include_in, config.import(value), 'utf8', (error_msg) => {
              if (error_msg) {
                console.error(chalk.red(error_msg));
              } else {
                console.info(
                  chalk.blue(`\nФайл ${this_stylesheet}: \nУспешно импортирован в файл: ${config.include_in}`),
                );
              }
            });
          } else {
            console.error(chalk.red(`\n${value} - объект не является файлом.`));
          }
        });
      }
    });
  } catch (error) {
    console.error(error.message);
  }
};

export default injectStyle;
