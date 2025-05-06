// команда convert

import svgToBase64Converter from '../utils/svgToBase64.mjs';

export const command = 'svgToBase64';
export const describe = `
    Конвертер svg в base64.

    Принимает 2 аргумента:
    1. -m или --mode с необходимостью выбора режима работы (single или all);
    2. После выбора режима необходимо указать путь используя глобальную опцию -p или --path;

    Если выбран single - то путь указывается до файла с его расширением.
    Если all - то указывается путь до дир-рии с файлами svg после конвертации в base64 в этом режиме информация не выводится в консоль, она выводится в текстовый файл!

    Ниже приведена полная команда вызванная из корня проекта:
    $ node ./cli-app/cli-tools.mjs convert ./src/assets/img/yourSvg.svg`.trim();

export const builder = (yargs) => {
  // Опция для указания формата кодирования, всей дир-рии или только одного файла
  yargs.option('mode', {
    alias: 'm',
    type: 'string',
    choises: ['single', 'all'],
    describe: `
      после ввода -m или --mode, выберите режим работы декодера.

      Команда single - позволяет декодировать 1 файл (необходимо указать путь до файла с расширением);
      Команда all - позволяет декодировать все файлы находящиеся в дир-рии (необходимо указать путь до дир-рии, без расширения);
      `.trim(),
  });

  // необходимые опции для работы команды, иначе ошибка
  yargs.demandOption(['mode', 'path'], 'Пожалуйста укажите режим работы конвертора и путь до конвертируемого объекта.');
};

export const handler = function (argv) {
  argv.output = svgToBase64Converter(argv);
  // console.log(argv);
};
