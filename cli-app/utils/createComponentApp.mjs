// Утилита для создания компонента
import { KITSYS, KITPLUGIN, KITCONFIG, CREATE_FILES } from '../config/config.mjs';

const cfg = KITCONFIG;
const createFiles = CREATE_FILES;
const plugin = KITPLUGIN;
const system = KITSYS;

const createComponentApp = async (argv) => {
  try {
    // Получаем содержимое команд пришедшее от пользователя.
    const name = argv.component;

    // проверка на дубликаты
    const exists = system.fs.existsSync(cfg.template.spawn_dir(name));

    // передадим в переменную до расширения файла,
    // имя, пришедшее из функции, и подставим его.
    const files_collection = [`${name}${cfg.template.extension}`, `${name}.mjs`, `_${name}${cfg.styles.extension}`];
    const component_data = [`${name}.json`];

    // проверяем на пустышку
    if (name === undefined || null || name === '') {
      console.error(
        plugin.chalk.red(
          `Ошибка: Для создания компонента необходимо использовать один из двух ключей: \n${plugin.chalk.blue(
            '-c',
          )} или ${plugin.chalk.blue('--component')} передать имя после ключа!`,
        ),
      );
    } else {
      // проверяем на дубликат
      if (exists === true) {
        console.error(
          plugin.chalk.red(
            `Внимание!\nКомпонент ${name} существует! Компонент не будет создан, попробуйте другое название.`,
          ),
        );
      } else {
        // тут объявляем что мы собираемся создать директорию с файлами
        await system.fs.mkdir(
          system.node_path.normalize(cfg.template.spawn_dir(name)),
          { recursive: true },
          (error_msg) => {
            if (error_msg) throw error_msg;

            console.info(plugin.chalk.yellow('------ * component * ------'));
            console.info(plugin.chalk.gray(`Каталог компонента создан: ${cfg.template.spawn_dir(name)}`));

            // тут создаём файл данных компонента:
            createFiles(component_data, cfg.template.data_dir);

            // тут создаём папку компонента, с файлами переданными в массиве files_collection
            createFiles(files_collection, cfg.template.spawn_dir(name));
          },
        );
      }
    }
  } catch (error) {
    console.error(error.message);
  }
};

export default createComponentApp;
