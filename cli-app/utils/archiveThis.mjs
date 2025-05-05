'use strict';

import { KITSYS, KITPLUGIN, KITCONFIG, CREATE_ARCHIVE } from '../config/config.mjs';

const plugin = KITPLUGIN;
const archive = KITCONFIG.archive;
const system = KITSYS;

const create_archive = CREATE_ARCHIVE;

const archiveThis = async (argv) => {
  try {
    const archive_mode = argv.options;
    const get_dir_path = argv.path;

    // debugging
    // console.log(`
    //   ${archive_mode} - формат архива переданный пользователем
    //   ${get_dir_path} - название и путь до архивируемой дир-рии
    //   `);

    if (argv.options === undefined || null || get_dir_path === undefined || get_dir_path === null) {
      console.error(
        plugin.chalk.red(
          'Для создания архива необходимо воспользоваться командой archive\nДалее передаём дополнительные команды после -o или --options:\ntgz - для создания tar.gz архива\ntar - для создания тарболла\nzip - для создания обычного zip архива\nДалее воспользуйтесь командой -p или --path для передачи после неё названия дир-рии которую необходимо заархивировать\nПример полной команды: node ./cli/kit-tools.mjs archive -o tgz -p build',
        ),
      );
    } else {
      // проверка переданных параметров {tgz, tar, zip} и пути
      if (archive_mode && get_dir_path) {
        console.log(
          plugin.chalk.blue(
            `################################################\nПереданы аргументы:\n=>  Формат архива - ${archive_mode}\n=>  Имя и путь до дир-рии - ${get_dir_path}\n=>  Архивирую...\n################################################`,
          ),
        );

        // проверка существует ли директория переданная в консоли пользователем
        await system.fs.readdir(system.node_path.resolve(system.__dirname, get_dir_path), 'utf8', (error_msg) => {
          if (error_msg) throw error_msg;
          else {
            console.info(plugin.chalk.green(`Директория: ${get_dir_path} - существует, создаю архив`));

            // функция создания архива, передаем в неё 3 параметра:
            // 1 - коллекцию объектов массива с параметрами для архиватора
            // 2 - опцию о расширении архива {tgz, tar, zip} (получаем из консоли)
            // 3 - имя директории, так-же получаем из консоли (то что ввёл пользователь)
            create_archive(archive, archive_mode, get_dir_path);
          }
        });
      }
    }
  } catch (error) {
    console.error(error.message);
  }
};

export default archiveThis;
