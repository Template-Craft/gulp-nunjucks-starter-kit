// команда archive -o или --options {tar, tgz, zip} -p или --path your_path

import archiveThis from '../utils/archiveThis.mjs';

export const command = 'archive';
export const describe =
  'Архивирование файлов и директорий проекта. Возможно создание архивов формата tar.gz, tar, zip. Для создания архива передайте последней строкой название директории которую вы бы хотели заархивировать.\n\nНиже приведена полная команда вызванная из корня проекта\n=> node ./cli-app/cli-tools.mjs archive -o tgz -p build';

export const builder = (yargs) => {
  // Опция для указания формата архива
  yargs.option('options', {
    alias: 'o',
    type: 'string',
    choices: ['tgz', 'tar', 'zip'], // выбор дополнительных опций
    describe:
      'после ввода -o или --options, выберите в каком формате необходимо создать архив. Доступно 3 дополнительных команды:\ntgz - создаст архив с расширением tar.gz; tar - создаст архив с рашрирением tar; zip - создаст архив с расширением zip',
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
