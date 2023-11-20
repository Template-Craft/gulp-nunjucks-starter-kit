/* eslint-disable camelcase */
// команда archive --options tar, tgz, zip

'use strict';

import archiveThis from '../utils/archiveThis.mjs';

export const command = 'archive';
export const describe =
  '- Архивирование папки build с собранным проектом, возможно создание архивов формата tar.gz, tar, zip';

export const builder = (yargs) => {};
export const handler = function (argv) {
  argv.output = archiveThis(argv);

  // console.log(argv);
};
