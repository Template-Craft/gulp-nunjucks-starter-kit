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
};
