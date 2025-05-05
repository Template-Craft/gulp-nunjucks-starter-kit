// Утилита для инъекции стилей компонента в главный файл стилей
// с помощью конструкции @import '';
import { KITSYS, KITPLUGIN, KITCONFIG } from '../config/config.mjs';

const config = KITCONFIG.styles;
const plugin = KITPLUGIN;
const system = KITSYS;

const injectStyle = async (argv) => {
  try {
    const value = argv.style; // переопределяем переменную, для красоты кода.

    const find_dir_path = `${config.component_path}${value}`;
    const this_stylesheet = config.component_stylesheet(find_dir_path, value);

    // Проверяем передачу аргумента и не пустая ли там строка
    if (value === undefined || null || value === '') {
      console.error(plugin.chalk.red(`Ошибка!\nПередана пустая строка или ничего не передано: ${value}`));
    } else {
      // ищем директорию с компонентом, имя получаем из командной строки.
      await system.fs.readdir(system.node_path.resolve(system.__dirname, find_dir_path), 'utf8', (error_msg) => {
        if (error_msg) throw error_msg;
        else {
          console.info(plugin.chalk.green(`Каталог существует и найден: ${find_dir_path}`));

          system.fs.stat(`${this_stylesheet}`, (error_msg, status) => {
            if (error_msg) throw error_msg;

            // Это файл?
            if (status.isFile()) {
              console.info(plugin.chalk.blue(`\n_${value}.scss - является файлом`));

              // Добавим в конец main.scss, импорт файла стилей нашего найденного компонента
              system.fs.appendFile(config.include_in, config.import_stylesheet(value), 'utf8', (error_msg) => {
                if (error_msg) throw error_msg;
                else {
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
    }
  } catch (error) {
    console.error(error.message);
  }
};

export default injectStyle;
