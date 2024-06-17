// Утилита для инъекции стилей компонента в главный файл стилей
// с помощью конструкции @import '';
'use strict';

import { KITPLUGIN, KITCONFIG } from '../config/config.mjs';

const config = KITCONFIG.styles;
const plugin = KITPLUGIN;

const injectStyle = async (style) => {
  try {
    const value = style; // переопределяем переменную, для красоты кода.

    const find_dir_path = `${config.component_path}${value}`;
    const this_stylesheet = config.component_stylesheet(find_dir_path, value);

    // ищем директорию с компонентом, имя получаем из командной строки.
    await plugin.fs.readdir(plugin.node_path.resolve(plugin.__dirname, find_dir_path), 'utf8', (err) => {
      if (err) {
        console.error(plugin.chalk.red(err)); // сообщаем ошибку в консоли
      } else {
        console.info(plugin.chalk.green(`Каталог существует и найден: ${find_dir_path}`));

        plugin.fs.stat(`${this_stylesheet}`, (error_msg, status) => {
          if (error_msg) {
            console.error(plugin.chalk.red(error_msg));
          }

          // Это файл?
          if (status.isFile()) {
            console.info(plugin.chalk.blue(`\n_${value}.scss - существует и является файлом`));

            // Добавим в конец main.scss, импорт файла стилей нашего найденного компонента
            plugin.fs.appendFile(config.include_in, config.import_stylesheet(value), 'utf8', (error_msg) => {
              if (error_msg) {
                console.error(plugin.chalk.red(error_msg));
              } else {
                console.info(
                  plugin.chalk.blue(`\nФайл ${this_stylesheet}: \nУспешно импортирован в файл: ${config.include_in}`),
                );
              }
            });
          } else {
            console.error(plugin.chalk.red(`\nОшибка: ${value} - объект не является файлом.`));
          }
        });
      }
    });
  } catch (error) {
    console.error(error.message);
  }
};

export default injectStyle;
