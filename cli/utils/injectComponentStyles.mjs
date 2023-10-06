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

const __dirname = path.resolve();

const injectStyle = async (style) => {
  try {
    const value = style; // переопределяем переменную, для красоты кода.

    const componentsPath = './src/views/components';
    const stylesPath = './src/styles';
    const importPath = '../views/components';

    const findDir = `${componentsPath}/${value}`;

    // здесь жёстко фиксируем путь до файла в который будем добавлять импорт стилей
    const injectTo = `${stylesPath}/_components_import.scss`;

    // здесь подставляем максимально достоверный путь до файла стилей компонента.
    const styleImport = `\n@import '${importPath}/${value}/${value}.scss';\n`;

    // ищем директорию с компонентом, имя получаем из командной строки.
    await fs.readdir(path.resolve(__dirname, findDir), 'utf8', (err, files) => {
      if (err) {
        console.error(chalk.red(err)); // сообщаем ошибку в консоли
      } else {
        console.info(chalk.green(`Каталог существует и найден: ${findDir}`));

        // в цикле перебираем файлы и выводим инфу в консоль.
        for (let file of files) {
          console.info(chalk.green(`\nКомпоненты найдены: ${file}`));
        }

        // проверяем является ли файл стилей, файлом если да, импортируем его в главный файл стилей.
        fs.stat(`${findDir}/${value}.scss`, (errStatus, status) => {
          if (errStatus) {
            console.error(chalk.red(errStatus));
          }

          // это файл?
          if (status.isFile()) {
            console.info(
              chalk.blue(`\n${value}.scss - действительно является файлом, добавляем импорт в таблицу стилей...`),
            );

            // Добавим в конец main.scss, импорт файла стилей нашего найденного компонента
            fs.appendFile(injectTo, styleImport, 'utf8', (err) => {
              if (err) {
                console.error(chalk.red(err));
              } else {
                console.info(chalk.blue(`\nФайл ${findDir}.scss: \nУспешно импортирован в файл: ${injectTo}`));
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
