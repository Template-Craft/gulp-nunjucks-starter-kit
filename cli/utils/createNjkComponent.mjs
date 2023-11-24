/* eslint-disable camelcase */
/* eslint-disable import/order */
/* eslint-disable n/no-unpublished-import */

// Утилита для создания компонента

'use strict';

import { KITPLUGIN, KITCONFIG, CREATE_FILES } from '../config/config.mjs';

const config = KITCONFIG;
const createFiles = CREATE_FILES;
const plugin = KITPLUGIN;

const createComponent = async (name) => {
  try {
    // проверка на дубликаты
    const exists = plugin.fs.existsSync(config.template.spawn_dir(name));

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
        plugin.chalk.red(
          `Ошибка: Для создания компонента необходимо использовать один из двух ключей: \n${plugin.chalk.blue(
            '-n',
          )} или ${plugin.chalk.blue('--name')} передать имя после ключа!`,
        ),
      );
    } else {
      // проверяем на дубликат
      if (exists === true) {
        console.error(plugin.chalk.red(`Ошибка: Компонент ${name} существует! Попробуйте другое имя`));
      } else {
        // тут объявляем что мы собираемся создать директорию с файлами
        await plugin.fs.mkdir(
          plugin.node_path.normalize(config.template.spawn_dir(name)),
          { recursive: true },
          (err) => {
            if (err) {
              console.error(plugin.chalk.red(err));
            }

            console.info(plugin.chalk.yellow('------ * component * ------'));
            console.info(plugin.chalk.gray(`Каталог компонента создан: ${config.template.spawn_dir(name)}`));

            // тут создаём файл данных компонента:
            createFiles(component_data, config.template.data_dir);

            // тут создаём папку компонента, с файлами переданными в массиве files_collection
            createFiles(files_collection, config.template.spawn_dir(name));
          },
        );
      }
    }
  } catch (error) {
    console.error(error.message);
  }
};

export default createComponent;
