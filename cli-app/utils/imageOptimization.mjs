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

// TODO: На свежую голову пересмотреть код, мб нужно будет оптимизировать.

const imageOptimization = async (arvg) => {
  try {
    // debugging
    // console.log('imageOptimization:\n', arvg);

    // arguments collection:
    const cmdsOpt = {
      cmd: arvg._[0], // команда imagemin
      minifyCMD: arvg.minify,
      convertCMD: arvg.convert,
      input: arvg.input,
      output: arvg.output,
    };

    const command = cmdsOpt.cmd;
    const input = cmdsOpt.input;
    const output = cmdsOpt.output;

    // Проверка аргументов для оптимизатора и конвертора
    if (
      (command === 'imagemin' && cmdsOpt.minifyCMD !== undefined && cmdsOpt.minifyCMD !== '') ||
      (cmdsOpt.convertCMD !== undefined && cmdsOpt.convertCMD !== '' && input !== '' && output !== '')
    ) {
      // Вывод информации в консоль
      console.log(plugin.chalk.bgBlue(';----------------------------------------------------:'));
      console.log('Получены данные для оптимизации:');
      console.log(`Получена команда: ${plugin.chalk.green(command)}`.trim());

      if (cmdsOpt.minifyCMD !== undefined && cmdsOpt.minifyCMD !== '') {
        console.log(
          `Аргументы команды: ${plugin.chalk.green(cmdsOpt.minifyCMD !== false ? `--minify="${cmdsOpt.minifyCMD}"` : undefined)}`.trim(),
        );
      }

      if (cmdsOpt.convertCMD !== undefined && cmdsOpt.convertCMD !== '') {
        console.log(
          `Аргументы команды: ${plugin.chalk.green(cmdsOpt.convertCMD !== false ? `--convert="${cmdsOpt.convertCMD}"` : undefined)}`.trim(),
        );
      }

      console.log(`Исходные изображения: ${plugin.chalk.yellow(input)}`.trim());
      console.log(`Оптимизированные изображения: ${plugin.chalk.green(output)}`.trim());
      console.log(plugin.chalk.bgBlue(';----------------------------------------------------:'));

      // code
      // обрабатываем наши аргументы
      if (cmdsOpt.minifyCMD === 'all') {
        const files = await imagemin([`${input}/*.{jpg,jpeg,png,svg,gif}`], {
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
      if (cmdsOpt.minifyCMD === 'gif') {
        const files = await imagemin([`${input}/*.gif`], {
          destination: output,
          plugins: [imageminGIFsicle()],
        });

        console.log('Оптимизация:\n', files);
      }

      // jpeg,jpg
      if (cmdsOpt.minifyCMD === 'jpeg') {
        const files = await imagemin([`${input}/*.{jpeg,jpg}`], {
          destination: output,
          plugins: [imageminJPEGtran(cfg.jpegtrancfg)],
        });

        console.log('Оптимизация:\n', files);
      }

      // png
      if (cmdsOpt.minifyCMD === 'png') {
        const files = await imagemin([`${input}/*.png`], {
          destination: output,
          plugins: [imageminPNGquant(cfg.pngquantcfg)],
        });

        console.log('Оптимизация:\n', files);
      }

      if (cmdsOpt.minifyCMD === 'svg') {
        const files = await imagemin([`${input}/*.svg`], {
          destination: output,
          plugins: [imageminSVGO(cfg.svgocfg)],
        });

        console.log('Оптимизация:\n', files);
      }

      // Конвертация в webp
      // проверим аргумент, конвертируем все виды изображений в webp
      if (cmdsOpt.convertCMD === 'webp') {
        const files = await imagemin([`${input}/*.{jpg,jpeg,png}`], {
          destination: `${output}/webp-converting/`,
          plugins: [imageminWEBP(cfg.webpcfg)],
        });

        console.log('Конвертация:\n', files);
      }
    } else {
      console.error(
        `
          ${plugin.chalk.red(`Ошибка!`)}

          Передан пустой аргумент или путь.`.trim(),
      );
    }
  } catch (error) {
    console.error(error.message);
  }
};

export default imageOptimization;
