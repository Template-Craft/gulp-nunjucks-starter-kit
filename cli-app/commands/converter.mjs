// команда convert

import svgToBase64Converter from '../utils/svgToBase64.mjs';

export const command = 'svgToBase64';
export const describe = `
  Конвертер svg в base64.

  Опции:
    -m или --mode для указания аргументов, название аргумента = название режима (single или all);
    -p или --path после выбора режима необходимо указать путь используя глобальную опцию;

  Аргументы:
    single - путь указывается до файла с его расширением. После конвертации в base64 в этом режиме информация выводится в консоль;
    all - путь указывается до дир-рии с файлами svg. После конвертации в base64 в этом режиме информация не выводится в консоль, она выводится в текстовый файл!

  Полная команда:
  $ node ./cli-app/cli-tools.mjs convert -m="single" -p="./src/assets/img/yourSvg.svg"`.trim();

export const builder = (yargs) => {
  // Опция для указания формата кодирования, всей дир-рии или только одного файла
  yargs.option('mode', {
    alias: 'm',
    type: 'string',
    choises: ['single', 'all'],
    describe: `
      после ввода -m или --mode, выберите режим работы декодера.

      Аргументы:
        single - позволяет декодировать 1 файл (необходимо указать путь до файла с расширением);
        all - позволяет декодировать все файлы находящиеся в дир-рии (необходимо указать путь до дир-рии, без расширения);
      `.trim(),
  });

  // необходимые опции для работы команды, иначе ошибка
  yargs.demandOption(['mode', 'path'], 'Пожалуйста укажите режим работы конвертора и путь до конвертируемого объекта.');
};

export const handler = function (argv) {
  argv.output = svgToBase64Converter(argv);
  // console.log(argv);
};
