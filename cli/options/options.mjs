// Коллекция опций
'use strict';

export const OPTIONS = {
  name: {
    type: 'string',
    alias: 'n',
    demandOption: false,
    describe: 'передать имя компонента.',
  },

  style: {
    type: 'string',
    alias: 's',
    demandOption: false,
    describe: 'поиск компонента по имени — для импорта стилей компонента в основную таблицу стилей проекта.',
  },

  options: {
    choices: ['tgz', 'tar', 'zip'], // выбор дополнительных опций
    type: 'string',
    demandOption: false,
    describe:
      'после ввода --option, выберите в каком формате необходимо создать архив. Доступно 3 дополнительных команды:\ntgz - создаст архив с расширением tar.gz; tar - создаст архив с рашрирением tar; zip - создаст архив с расширением zip',
  },
};
