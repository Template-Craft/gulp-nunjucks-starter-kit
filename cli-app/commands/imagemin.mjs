// команда imagemin - для оптимизации изображений, используется imagemin и прочие плагины.

import imageminApp from '../utils/imageminApp.mjs';

export const command = 'imagemin';
export const describe = `
  Оптимизация изображений с помощью imagemin.
  Для оптимизации указываем путь до дир-рии с изображениями.

  Опции:
    -m или --minify для указания аргументов, название аргумента = название плагина imagemin.
    -c или --convert для выбора формата конвертации изображения.
    -i или --input опция для указания пути до дир-рии исходников.
    -o или --output опция для указания пути до выходного каталога куда будут сложены оптимизированные файлы.

  Аргументы:
    gif   - для оптимизации .gif;
    jpeg  - для оптимизации .jpeg;
    png   - для оптимизации .png;
    svg   - для оптимизации .svg;
    webp  - для конвертации jpg,png в .webp (работает с опцией -con или --convert);
    all   - для оптимизации всех форматов (кроме .webp);

  Полная команда:
    $ node ./cli-app/cli-tools.mjs imagemin -m jpeg --input="./src/assets/img" --output="./build/assets/img"
`.trim();

export const builder = (yargs) => {
  // Опция для выбора режима работы
  yargs.option('minify', {
    alias: 'm',
    type: 'string',
    choises: ['gif', 'jpeg', 'png', 'svg', 'all'],
    describe: `
      после ввода -m или --minify, выберите какой формат изображений нужно оптимизировать.

      доступные опции:
        gif   - для оптимизации .gif;
        jpeg  - для оптимизации .jpeg;
        png   - для оптимизации .png;
        svg   - для оптимизации .svg;
        all   - для оптимизации всех вышеперечисленных форматов;
    `.trim(),
  });

  yargs.option('input', {
    alias: 'i',
    type: 'string',
    describe: `
      после ввода -i или --input укажите путь до дир-рии исходников.
    `.trim(),
  });

  yargs.option('output', {
    alias: 'o',
    type: 'string',
    describe: `
      после ввода -o или --output укажите путь до дир-рии в которую необходимо сложить оптимизированные изображения.
    `.trim(),
  });

  // Опция по конвертации изображений в разные форматы
  yargs.option('convert', {
    alias: 'c',
    type: 'string',
    choises: ['webp'],
    describe: `
      после ввода -c или --convert, выберите в какой формат изображение необходимо переконвертировать.

      доступные опции:
        webp - для конвертации jpg,png в webp формат;
    `.trim(),
  });

  // необходимые опции для работы команды, иначе ошибка
  yargs.demandOption(
    ['input', 'output'],
    'Необходимо указать опцию с аргументами и пути до дир-рии оптимизируемых объектов и до дир-рии в которую необходимо поместить оптимизированные изображения.',
  );
};

export const handler = function (argv) {
  argv.output = imageminApp(argv);

  // console.log('handler:\n', argv);
};
