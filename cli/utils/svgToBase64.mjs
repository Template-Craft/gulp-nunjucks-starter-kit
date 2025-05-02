// Утилита для конвертации svg в base64 и вывода результата в консоль.

'use strict';

import { KITSYS, KITPLUGIN } from '../config/config.mjs';

const plugin = KITPLUGIN;
const system = KITSYS;

const svgToBase64Converter = async (argv) => {
  try {
    // console.log(argv);

    // Получаем путь до файла, пришедшее как последний аргумент из консоли
    const get_svg_path = argv._[1];
    // console.log(get_svg_path);

    if (get_svg_path === undefined || get_svg_path === null) {
      console.error(plugin.chalk.red('Ошибка!\nДля конвертации svg в base64 необходимо передать путь до файла svg.'));
    } else {
      // Чтение файла svg
      await system.fs.readFile(system.node_path.resolve(system.__dirname, get_svg_path), 'utf8', (error_msg, data) => {
        if (error_msg) console.error(plugin.chalk.red(error_msg));

        // Конвертация и вывод в консоль.
        const base64FromSVG = plugin.svg64(data);
        console.log(plugin.chalk.bgYellow('--------- [Результат конвертации] ---------'));
        console.log(`\n${plugin.chalk.dim(base64FromSVG)}\n`);
        console.log(plugin.chalk.yellow('Скопируйте код из вывода, и используйте его для вставки в html или css.'));
      });
    }
  } catch (error) {
    console.error(error.message);
  }
};

export default svgToBase64Converter;
