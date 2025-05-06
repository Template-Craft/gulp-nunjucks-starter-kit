// команда imagemin - для оптимизации изображений, используется imagemin и прочие плагины.

export const command = 'imagemin';
export const describe = `
  Оптимизация изображений с помощью imagemin.

  Опции:
    -min или --minify для указания аргументов, название аргумента = название плагина imagemin.
    -p или --path глобальная опция для указания пути до дир-рии.

  Аргументы:
    gif   - для оптимизации .gif;
    jpeg  - для оптимизации .jpeg;
    png   - для оптимизации .png;
    svg   - для оптимизации .svg;
    webp  - для оптимизации .webp;

  Ниже приведена полная команда вызванная из корня проекта:
    $ node ./cli-app/cli-tools.mjs imagemin -min jpeg -p ./src/assets/img
`.trim();

export const builder = (yargs) => {
  // Опция для выбора режима работы
  yargs.option('minify', {
    alias: 'min',
    type: 'string',
    choises: ['gif', 'jpeg', 'png', 'svg', 'webp'],
    describe: `
      после ввода -min или --minify, выберите какой формат изображений нужно оптимизировать.

      доступные опции:
        gif   - для оптимизации .gif;
        jpeg  - для оптимизации .jpeg;
        png   - для оптимизации .png;
        svg   - для оптимизации .svg;
        webp  - для оптимизации .webp;
    `.trim(),
  });

  // необходимые опции для работы команды, иначе ошибка
  yargs.demandOption(
    ['minify', 'path'],
    'Необходимо указать опцию с аргументом и путь до дир-рии оптимизируемых объектов.',
  );
};

// export const handler = function (argv) {
//   argv.output = ;

//   console.log(argv);
// }
