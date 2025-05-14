import { KITSYS, KITPLUGIN, KITCONFIG, CREATE_ARCHIVE, errorThrower } from '../config/config.mjs';

const plugin = KITPLUGIN;
const archive = KITCONFIG.archive;
const system = KITSYS;

const create_archive = CREATE_ARCHIVE;

const createArchiveApp = async (argv) => {
  try {
    const archive_mode = argv.options;
    const get_dir_path = argv.path;

    // debugging
    // console.log(`
    //   ${archive_mode} - формат архива переданный пользователем
    //   ${get_dir_path} - название и путь до архивируемой дир-рии
    //   `);

    if (
      archive_mode === undefined ||
      null ||
      get_dir_path === undefined ||
      get_dir_path === null ||
      get_dir_path === ''
    ) {
      const badOptionErrorMsg = plugin.chalk.yellow(
        `
          Ошибка!

          Для создания архива необходимо воспользоваться командой archive
          Далее передаём дополнительные команды после -o или --options:
            tgz - для создания tar.gz архива
            tar - для создания тарболла
            zip - для создания обычного zip архива

          Далее воспользуйтесь командой -p или --path для передачи после,
          названия дир-рии которую необходимо заархивировать.

          Пример полной команды:
          $ node ./cli/kit-tools.mjs archive -o tgz -p build
          `,
      );

      errorThrower(badOptionErrorMsg);
    }

    // проверка переданных параметров {tgz, tar, zip} и пути
    if (archive_mode && get_dir_path) {
      console.log(plugin.chalk.bgBlue('################################################'));
      console.log('Переданы аргументы:');
      console.log(`=>  Формат архива - ${plugin.chalk.green(archive_mode)}`);
      console.log(`=>  Имя и путь до дир-рии - ${plugin.chalk.green(get_dir_path)}`);
      console.log('=>  Архивирую...');
      console.log(plugin.chalk.bgBlue('################################################'));

      // проверка существует ли директория переданная в консоли пользователем
      await system.fs.readdir(system.node_path.resolve(system.__dirname, get_dir_path), 'utf8', (error_msg) => {
        if (error_msg) errorThrower(error_msg);

        console.info(plugin.chalk.green(`Директория: ${get_dir_path} - существует, создаю архив`));

        // функция создания архива, передаем в неё 3 параметра:
        // 1 - коллекцию объектов массива с параметрами для архиватора
        // 2 - опцию о расширении архива {tgz, tar, zip} (получаем из консоли)
        // 3 - имя директории, так-же получаем из консоли (то что ввёл пользователь)
        create_archive(archive, archive_mode, get_dir_path);
      });
    }
  } catch (error) {
    console.error(error.message);
  }
};

export default createArchiveApp;
