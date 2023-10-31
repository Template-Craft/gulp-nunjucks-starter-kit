/* eslint-disable camelcase */
/* eslint-disable import/order */
/* eslint-disable n/no-unpublished-import */

// Утилита для создания компонента

'use strict';
import fs from 'fs';
// не забываем про остальных юзеров, интегрируем утилиту path

import path from 'node:path';
import chalk from 'chalk';

import { UTILSCONFIG, CREATE_FILES } from '../config/config.mjs';
const config = UTILSCONFIG;
const createFiles = CREATE_FILES;

const createComponent = async (name) => {
  try {
    // проверка на дубликаты
    const exists = fs.existsSync(config.template.spawn_dir(name));

    // передадим в переменную до расширения файла,
    // имя, пришедшее из функции, и подставим его.
    const files_collection = [
      `${name}${config.template.extension}`,
      `${name}.mjs`,
      `_${name}${config.styles.extension}`,
    ];
    const component_data = [`${name}.json`];

    // проверяем на пустышку
    if (name === undefined) {
      console.error(
        chalk.red(
          `Ошибка: Для создания компонента необходимо использовать один из двух ключей: \n${chalk.blue(
            '-n',
          )} или ${chalk.blue('--name')} передать имя после ключа!`,
        ),
      );
    } else {
      // проверяем на дубликат
      if (exists === true) {
        console.error(chalk.red(`Ошибка: Компонент ${name} существует! Попробуйте другое имя`));
      } else {
        // тут объявляем что мы собираемся создать директорию с файлами
        await fs.mkdir(path.normalize(config.template.spawn_dir(name)), { recursive: true }, (err) => {
          if (err) {
            console.error(chalk.red(err));
          }

          console.info(chalk.yellow('------ * component * ------'));
          console.info(chalk.gray(`Каталог компонента создан: ${config.template.spawn_dir(name)}`));

          // тут создаём файл данных компонента:
          createFiles(component_data, config.template.data_dir);

          // тут создаём папку компонента, с файлами переданными в массиве files_collection
          createFiles(files_collection, config.template.spawn_dir(name));
        });
      }
    }
  } catch (error) {
    console.error(error.message);
  }
};

export default createComponent;
