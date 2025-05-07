/* eslint-disable n/no-unpublished-import */
// Оптимизация, и конвертация изображений.
// Используется плагин imagemin и его дополнительные плагины.

import imagemin from 'imagemin';
import imageminJPEGtran from 'imagemin-jpegtran';
import imageminPNGquant from 'imagemin-pngquant';
import imageminGIFsicle from 'imagemin-gifsicle';
import imageminSVGO from 'imagemin-svgo';
import imageminWEBP from 'imagemin-webp';

import { KITPLUGIN, KITCONFIG } from '../config/config.mjs';

const plugin = KITPLUGIN;
const cfg = KITCONFIG;

const imageOptimization = async (arvg) => {
  try {
    // debugging
    // console.log('imageOptimization:\n', arvg);

    // arguments collection:
    const cmdArguments = {
      cmd: arvg.minify,
      input: arvg.input,
      output: arvg.output,
    };

    // Проверка на пустые, отсутствующие и т.д. команды
    if (
      cmdArguments.cmd === undefined ||
      null ||
      cmdArguments.cmd === '' ||
      cmdArguments.input === '' ||
      cmdArguments.output === '' ||
      cmdArguments.input === undefined ||
      cmdArguments.output === undefined ||
      null
    ) {
      console.error(
        `
        ${plugin.chalk.red(`Ошибка!`)}

        Пустой аргумент команды, или путь.
        Получена команда: ${plugin.chalk.green(cmdArguments.cmd)}
        Исходные изображения: ${plugin.chalk.yellow(cmdArguments.input)}
        Оптимизированные изображения: ${plugin.chalk.green(cmdArguments.output)}
        `.trim(),
      );
    } else {
      console.log(plugin.chalk.bgBlue(';----------------------------------------------------:'));
      console.log('Получены данные для оптимизации:');
      console.log(`Аргумент команды:  ${plugin.chalk.green(cmdArguments.cmd)}`.trim());
      console.log(`Исходные изображения:  ${plugin.chalk.yellow(cmdArguments.input)}`.trim());
      console.log(`Оптимизированные изображения:  ${plugin.chalk.green(cmdArguments.output)}`.trim());
      console.log(plugin.chalk.bgBlue(';----------------------------------------------------:'));

      const input = cmdArguments.input;
      const output = cmdArguments.output;

      // обрабатываем наши аргументы
      if (cmdArguments.cmd === 'all') {
        const files = await imagemin([`${input}/*.{jpg,jpeg,png,svg,gif}`], {
          // destination: system.node_path.resolve(system.__dirname, destination),
          destination: output,
          plugins: [
            imageminJPEGtran(cfg.jpegtrancfg),
            imageminPNGquant(cfg.pngquantcfg),
            imageminSVGO(cfg.svgocfg),
            imageminGIFsicle(),
          ],
        });

        console.log('Оптимизация:\n', files);
      }

      // gif
      if (cmdArguments.cmd === 'gif') {
        const files = await imagemin([`${input}/*.gif`], {
          // destination: system.node_path.resolve(system.__dirname, destination),
          destination: output,
          plugins: [imageminGIFsicle()],
        });

        console.log('Оптимизация:\n', files);
      }

      // jpeg,jpg
      if (cmdArguments.cmd === 'jpeg') {
        const files = await imagemin([`${input}/*.{jpeg,jpg}`], {
          // destination: system.node_path.resolve(system.__dirname, destination),
          destination: output,
          plugins: [imageminJPEGtran(cfg.jpegtrancfg)],
        });

        console.log('Оптимизация:\n', files);
      }

      // png
      if (cmdArguments.cmd === 'png') {
        const files = await imagemin([`${input}/*.png`], {
          // destination: system.node_path.resolve(system.__dirname, destination),
          destination: output,
          plugins: [imageminPNGquant(cfg.pngquantcfg)],
        });

        console.log('Оптимизация:\n', files);
      }

      if (cmdArguments.cmd === 'svg') {
        const files = await imagemin([`${input}/*.svg`], {
          // destination: system.node_path.resolve(system.__dirname, destination),
          destination: output,
          plugins: [imageminSVGO(cfg.svgocfg)],
        });

        console.log('Оптимизация:\n', files);
      }
    }
  } catch (error) {
    console.error(error.message);
  }
};

export default imageOptimization;
