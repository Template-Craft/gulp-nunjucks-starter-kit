/* eslint-disable camelcase */

'use strict';

import { PLUGIN, UTILSCONFIG, CREATE_ARCHIVE } from '../config/config.mjs';

const plugin = PLUGIN;
const archive = UTILSCONFIG.archive;

const create_archive = CREATE_ARCHIVE;

const archiveThis = async (argv) => {
  try {
    // коллекция режимов:
    const archive_mode = {
      options: argv.options === undefined || null,
      tgz: argv.options === 'tgz',
      tar: argv.options === 'tar',
      zip: argv.options === 'zip',
    };

    // получаем пришедшее имя из консоли
    const get_folder_name = argv._[1];

    // debugging
    // console.log(
    //   `
    //   ${archive_mode.tgz} - передан ли ключ tgz?
    //   ${archive_mode.tar} - передан ли ключ tar?
    //   ${archive_mode.zip} - передан ли ключ zip?
    //   `,
    // );

    if (archive_mode.options || get_folder_name === undefined || get_folder_name === null) {
      console.error(
        plugin.chalk.red(
          'Для создания архива необходимо воспользоваться командой archive\nДалее передаём дополнительные команды после --options:\ntgz - для создания tar.gz архива\ntar - для создания тарболла\nzip - для создания обычного zip архива',
        ),
      );
    } else {
      // проверка режима tgz
      if (archive_mode.tgz) {
        console.log(plugin.chalk.blue('передан аргумент tgz, создаю tar.gz архив...'));

        // записываем в константу имя пришедшее из консоли
        const find_direction = `${get_folder_name}`;

        // опции архива
        const archive_option = archive.tgz.option;
        const extension = archive.tgz.extension;

        // поиск каталога, пришедшего из консоли в виде строки
        await plugin.fs.readdir(plugin.nodePath.resolve(plugin.__dirname, find_direction), 'utf8', (error_msg) => {
          if (error_msg) {
            console.error(plugin.chalk.red(error_msg));
          } else {
            console.info(plugin.chalk.green(`${find_direction} - существует`));

            create_archive(archive_option, get_folder_name, extension);
          }
        });
      }

      // проверка режима tar
      if (archive_mode.tar) {
        console.log(plugin.chalk.blue('передан аргумент --tar, создаю tar архив...'));

        // записываем в константу имя пришедшее из консоли
        const find_direction = `${get_folder_name}`;

        // опции архива
        const archive_option = archive.tar.option;
        const extension = archive.tar.extension;

        // поиск каталога, пришедшего из консоли в виде строки
        await plugin.fs.readdir(plugin.nodePath.resolve(plugin.__dirname, find_direction), 'utf8', (error_msg) => {
          if (error_msg) {
            console.error(plugin.chalk.red(error_msg));
          } else {
            console.info(plugin.chalk.green(`${find_direction} - существует`));

            create_archive(archive_option, get_folder_name, extension);
          }
        });
      }

      // проверка режима zip
      if (archive_mode.zip) {
        console.log(plugin.chalk.blue('передан аргумент --zip, создаю zip архив...'));

        // записываем в константу имя пришедшее из консоли
        const find_direction = `${get_folder_name}`;

        // опции архива
        const archive_option = archive.zip.option;
        const extension = archive.zip.extension;

        // поиск каталога, пришедшего из консоли в виде строки
        await plugin.fs.readdir(plugin.nodePath.resolve(plugin.__dirname, find_direction), 'utf8', (error_msg) => {
          if (error_msg) {
            console.error(plugin.chalk.red(error_msg));
          } else {
            console.info(plugin.chalk.green(`${find_direction} - существует`));

            create_archive(archive_option, get_folder_name, extension);
          }
        });
      }
    }
  } catch (error) {
    console.error(error.message);
  }
};

export default archiveThis;
