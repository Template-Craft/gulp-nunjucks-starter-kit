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

    const cmdInput = {
      cmd: arvg._[0], // команда imagemin
      minifyCMD: arvg.minify,
      convertCMD: arvg.convert,
      input: arvg.input,
      output: arvg.output,
    };

    // function getObjIncludedName(obj, name) {
    //   Object.getOwnPropertyNames(obj).includes(name);
    // }

    // фун-ция помощник вывода информации в консоль
    // Принимает объект пришедший из yargs (в данном случае arvg)
    function consoleInformer(args) {
      // Вывод информации в консоль
      console.log(plugin.chalk.bgBlue(';----------------------------------------------------:'));
      console.log('Получены данные для оптимизации:');
      console.log(`Получена команда: ${plugin.chalk.green(args._[0])}`.trim());

      // Обрабатываем опции команды, и выводим сообщение только если пришла правильная опция
      if ('minify' in args) {
        console.log(`Аргументы команды: ${plugin.chalk.green(`--minify="${args.minify}"`)}`.trim());
      }

      if ('convert' in args) {
        console.log(`Аргументы команды: ${plugin.chalk.green(`--convert="${args.convert}"`)}`.trim());
      }

      console.log(`Исходные изображения: ${plugin.chalk.green(args.input)}`.trim());
      console.log(`Оптимизированные изображения: ${plugin.chalk.blue(args.output)}`.trim());
      console.log(plugin.chalk.bgBlue(';----------------------------------------------------:'));
    }

    // Проверяем команду, аргументы, и пути
    // если путые и неопределённые - то сообщаем об ошибке.
    if (
      (cmdInput.cmd === 'imagemin' &&
        cmdInput.minifyCMD !== undefined &&
        cmdInput.minifyCMD !== '' &&
        cmdInput.input !== '' &&
        cmdInput.input !== undefined &&
        cmdInput.output !== '' &&
        cmdInput.output !== undefined) ||
      (cmdInput.cmd === 'imagemin' &&
        cmdInput.convertCMD !== undefined &&
        cmdInput.convertCMD !== '' &&
        cmdInput.input !== '' &&
        cmdInput.input !== undefined &&
        cmdInput.output !== '' &&
        cmdInput.output !== undefined)
    ) {
      // Выводим информацию в консоль
      consoleInformer(arvg);

      // Обработка опций для оптимизации изображений
      switch (cmdInput.minifyCMD || cmdInput.convertCMD) {
        // argument - all
        case 'all':
          {
            const files = await imagemin([`${cmdInput.input}/*.{jpg,jpeg,png,svg,gif}`], {
              destination: cmdInput.output,
              plugins: [
                imageminJPEGtran(cfg.jpegtrancfg),
                imageminPNGquant(cfg.pngquantcfg),
                imageminSVGO(cfg.svgocfg),
                imageminGIFsicle(),
              ],
            });

            console.log('Оптимизация:\n', files);
          }
          break;
        // argument - gif
        case 'gif':
          {
            const files = await imagemin([`${cmdInput.input}/*.gif`], {
              destination: cmdInput.output,
              plugins: [imageminGIFsicle()],
            });

            console.log('Оптимизация:\n', files);
          }
          break;
        // argument - jpg
        case 'jpeg':
          {
            const files = await imagemin([`${cmdInput.input}/*.{jpeg,jpg}`], {
              destination: cmdInput.output,
              plugins: [imageminJPEGtran(cfg.jpegtrancfg)],
            });

            console.log('Оптимизация:\n', files);
          }
          break;
        // argument - png
        case 'png':
          {
            const files = await imagemin([`${cmdInput.input}/*.png`], {
              destination: cmdInput.output,
              plugins: [imageminPNGquant(cfg.pngquantcfg)],
            });

            console.log('Оптимизация:\n', files);
          }
          break;
        // argument - svg
        case 'svg':
          {
            const files = await imagemin([`${cmdInput.input}/*.svg`], {
              destination: cmdInput.output,
              plugins: [imageminSVGO(cfg.svgocfg)],
            });

            console.log('Оптимизация:\n', files);
          }
          break;
        // argument - webp (конвертация)
        case 'webp':
          {
            const files = await imagemin([`${cmdInput.input}/*.{jpg,jpeg,png}`], {
              destination: `${cmdInput.output}/webp-converting/`,
              plugins: [imageminWEBP(cfg.webpcfg)],
            });

            console.log('Конвертация:\n', files);
          }
          break;

        default:
          console.error(plugin.chalk.red('Внимание!\nПереданы неверные данные:\n'), arvg);
          break;
      }
    } else {
      console.error(
        plugin.chalk.red(
          'Ошибка!\nОтсутствуют пути до файлов, либо передан не верный аргумент или опция команды imagemin:\n',
        ),
        arvg,
      );
    }
  } catch (error) {
    console.error(error.message);
  }
};

export default imageOptimization;
