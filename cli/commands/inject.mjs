/* eslint-disable n/no-unpublished-import */
/* eslint-disable import/order */

// команда import -s --style
'use strict';
import injectStyle from '../utils/injectComponentStyles.mjs';

export const command = 'import';
export const describe = '- импортировать стили компонента, в файл _components_import.scss';

export const builder = (yargs) => {};
export const handler = function (argv) {
  argv.output = injectStyle(argv.style);
  // console.log(argv);
};
