// команда creat -n --name
'use strict';
import createComponent from '../utils/createNjkComponent.mjs';

export const command = 'create';
export const describe = '- Создание njk компонента';

export const builder = (yargs) => {};
export const handler = function (argv) {
  argv.output = createComponent(argv.name);
  // console.log(argv);
};
