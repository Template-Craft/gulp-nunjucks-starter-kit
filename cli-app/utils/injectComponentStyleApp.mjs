// Утилита для инъекции стилей компонента в главный файл стилей
// с помощью конструкции @import '';
import { KITSYS, KITPLUGIN, KITCONFIG, errorThrower } from '../config/config.mjs';

const cfg = KITCONFIG.styles;
const plugin = KITPLUGIN;
const system = KITSYS;

const injectComponentStyleApp = async (argv) => {
  try {
    const value = argv.style; // переопределяем переменную, для красоты кода.

    const find_dir_path = `${cfg.component_path}${value}`;
    const this_stylesheet = cfg.component_stylesheet(find_dir_path, value);

    // Проверяем передачу аргумента и не пустая ли там строка
    if (value === undefined || null || value === '') {
      const nameErrorMsg = `
        Ошибка!

        Передана пустая строка или ничего не передано: ${value}`;

      errorThrower(nameErrorMsg);
    }

    // ищем директорию с компонентом, имя получаем из командной строки.
    await system.fs.readdir(system.node_path.resolve(system.__dirname, find_dir_path), 'utf8', (error_msg) => {
      if (error_msg) errorThrower(error_msg);

      console.info(plugin.chalk.green(`Каталог существует и найден: ${find_dir_path}`));

      system.fs.stat(`${this_stylesheet}`, (error_msg, status) => {
        if (error_msg) errorThrower(error_msg);

        // Это файл?
        if (status.isFile()) {
          console.info(plugin.chalk.blue(`\n_${value}.scss - является файлом`));

          // Добавим в конец main.scss, импорт файла стилей нашего найденного компонента
          system.fs.appendFile(cfg.include_in, cfg.import_stylesheet(value), 'utf8', (error_msg) => {
            if (error_msg) errorThrower(error_msg);

            console.info(
              plugin.chalk.blue(`\nФайл ${this_stylesheet}: \nУспешно импортирован в файл: ${cfg.include_in}`),
            );
          });
        } else {
          const isFileErrorMsg = `
              Ошибка!

              ${value} - объект не является файлом.`;

          errorThrower(isFileErrorMsg);
        }
      });
    });
  } catch (error) {
    console.error(error.message);
  }
};

export default injectComponentStyleApp;
