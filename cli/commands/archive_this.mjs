// команда archive --options tar, tgz, zip

'use strict';

import archiveThis from '../utils/archiveThis.mjs';

export const command = 'archive';
export const describe =
  '- Архивирование файлов и директорий проекта, возможно создание архивов формата tar.gz, tar, zip. Для создания архива передайте последней строкой название директории которую вы бы хотели заорхивировать.';

export const builder = (yargs) => {};
export const handler = function (argv) {
  argv.output = archiveThis(argv);

  // console.log(argv);
};
