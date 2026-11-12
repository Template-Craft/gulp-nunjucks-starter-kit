/* eslint-disable n/no-unpublished-import */
 

//  -----------------------------------------------------------------------------;
//    Коллекция конфигураций для вывода сообщений об ошибках в консоль и систему
//  -----------------------------------------------------------------------------;

import notifier from 'node-notifier';

import { t } from '../i18n/index.mjs';

export const errors = {
  // Обработчик ошибок, перехватывает ошибки без остановки gulp.watch.
  // Отображает ошибки в терминале и в виде системных оповещений.
  handler: function (err, msg) {
    notifier.notify({
      title: 'Gulp.js',
      message: `${msg}: \n${err.message}`,
      timeout: 4,
      'app-name': `${app.pkg.appName}`,
    });
  },
  messages: {
    sass: t('errors.sass'),
    njk: t('errors.njk'),
    scripts: t('errors.scripts'),
    json: t('errors.json'),
    vendors: t('errors.vendors'),
    assets: t('errors.assets'),
  },
};
