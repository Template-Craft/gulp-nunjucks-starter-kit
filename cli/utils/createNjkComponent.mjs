/* eslint-disable n/no-unpublished-import */
// Утилита для создания компонента

'use strict';

import fs from 'fs';
// не забываем про остальных юзеров, интегрируем утилиту path
// eslint-disable-next-line import/order
import path from 'path';
import chalk from 'chalk';

const createComponent = async (name) => {
  try {
    const dataDirectory = './src/views/data/';
    const componentDirectory = `./src/views/components/${name}/`;

    // передадим в переменную до расширения файла,
    // имя, пришедшее из функции, и подставим его.
    const files = [`${name}.njk`, `_${name}.scss`];
    const componentData = [`${name}.json`];

    // проверяем на пустышку
    if (name === undefined) {
      console.error(
        chalk.red(
          `Для создания компонента необходимо использовать один из двух ключей: \n${chalk.blue('-n')} или ${chalk.blue(
            '--name',
          )} передать имя после ключа!`,
        ),
      );
    } else {
      // тут объявляем что мы собираемся создать директорию с файлами
      await fs.mkdir(path.normalize(componentDirectory), { recursive: true }, (err) => {
        if (err) {
          console.error(chalk.red(err));
        }

        console.info(chalk.yellow('------ * component * ------'));
        console.info(chalk.gray(`Каталог компонентов создан.: ${componentDirectory}`));

        // перебираем массив, записываем значения передаваемое фун-ции
        // в переменные перед объявлением расширения файла и создаём файлы.
        files.forEach((file) => {
          fs.open(`${componentDirectory}${path.basename(file)}`, 'w', (err) => {
            if (err) {
              console.error(chalk.red(err));
            }

            console.info(chalk.green(`Файлы компонентов созданы: ${file}`)); // в консоли, говорим что всё ок.
          });
        });

        componentData.forEach((data) => {
          fs.open(`${dataDirectory}${path.basename(data)}`, 'w', (err) => {
            if (err) {
              console.error(chalk.red(err));
            }

            console.info(chalk.green(`Файл данных компонента создан: ${dataDirectory}${data}`)); // в консоли, говорим что всё ок.
          });
        });
      });
    }
  } catch (error) {
    console.error(error.message);
  }
};

export default createComponent;
