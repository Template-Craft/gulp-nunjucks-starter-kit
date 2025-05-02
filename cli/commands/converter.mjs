// команда convert

'use strict';

import svgToBase64Converter from '../utils/svgToBase64.mjs';

export const command = 'svgToBase64';
export const describe =
  '- Конвертер svg в base64.\nПросто передайте путь до svg сразу после команды и наслаждайтесь!\nПример команды: node ./cli/kit-tools.mjs convert ./src/assets/img/yourSvg.svg';

export const builder = (yargs) => {};
export const handler = function (argv) {
  argv.output = svgToBase64Converter(argv);
  // console.log(argv);
};
