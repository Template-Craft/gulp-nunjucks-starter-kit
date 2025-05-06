// команда archive -o или --options {tar, tgz, zip} -p или --path your_path

import archiveThis from '../utils/archiveThis.mjs';

export const command = 'archive';
export const describe = `
    Архивирование файлов и директорий проекта.
    Возможно создание архивов формата tar.gz, tar, zip.
    Для создания архива необходимо указать опцию после команды, ей в свою очередь передать один из трёх параметров {tar, tgz, zip} и указать путь до дир-рии которую необходимо заархивировать.

    Ниже приведена полная команда вызванная из корня проекта:
    $ node ./cli-app/cli-tools.mjs archive -o tgz -p build
  `.trim();

export const builder = (yargs) => {
  // Опция для указания формата архива
  yargs.option('options', {
    alias: 'o',
    type: 'string',
    choices: ['tgz', 'tar', 'zip'], // выбор дополнительных опций
    describe: `
      после ввода -o или --options, выберите в каком формате необходимо создать архив.

      Доступно 3 дополнительных команды:
      tgz - создаст архив с расширением tar.gz;
      tar - создаст архив с рашрирением tar;
      zip - создаст архив с расширением zip`.trim(),
  });

  // необходимые опции для работы команды, иначе ошибка
  yargs.demandOption(
    ['options', 'path'],
    'Пожалуйста укажите опции архиватора и путь или название дир-рии что-бы создать архив.',
  );
};

export const handler = (argv) => {
  argv.output = archiveThis(argv);

  // Debug
  // console.log(argv);
};
