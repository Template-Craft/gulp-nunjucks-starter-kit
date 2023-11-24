/* eslint-disable camelcase */

'use strict';

import { KITPLUGIN, KITCONFIG, CREATE_ARCHIVE } from '../config/config.mjs';

const plugin = KITPLUGIN;
const archive = KITCONFIG.archive;

const create_archive = CREATE_ARCHIVE;

const archiveThis = async (argv) => {
  try {
    const archive_mode = argv.options;

    // получаем пришедшее имя из консоли
    const get_folder_name = argv._[1];

    // debugging
    // console.log(`${archive_mode} - передано пользователем`);

    if (argv.options === undefined || null || get_folder_name === undefined || get_folder_name === null) {
      console.error(
        plugin.chalk.red(
          'Для создания архива необходимо воспользоваться командой archive\nДалее передаём дополнительные команды после --options:\ntgz - для создания tar.gz архива\ntar - для создания тарболла\nzip - для создания обычного zip архива',
        ),
      );
    } else {
      // проверка переданных параметров {tgz, tar, zip}
      if (archive_mode) {
        console.log(plugin.chalk.blue(`передан аргумент ${archive_mode}, создаю архив...`));

        // проверка существует ли директория переданная в консоли пользователем
        await plugin.fs.readdir(plugin.node_path.resolve(plugin.__dirname, get_folder_name), 'utf8', (error_msg) => {
          if (error_msg) {
            console.error(plugin.chalk.red(error_msg));
          } else {
            console.info(plugin.chalk.green(`Директория: ${get_folder_name} - существует`));

            // функция создания архива, передаем в неё 3 параметра:
            // 1 - коллекцию объектов массива с параметрами для архиватора
            // 2 - опцию о расширении архива {tgz, tar, zip} (получаем из консоли)
            // 3 - имя директории, так-же получаем из консоли (то что ввёл пользователь)
            create_archive(archive, archive_mode, get_folder_name);
          }
        });
      }
    }
  } catch (error) {
    console.error(error.message);
  }
};

export default archiveThis;
