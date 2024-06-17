/* eslint-disable n/no-unpublished-import */
/* eslint-disable no-undef */

//  -----------------------------------------------------------------------------;
//    Коллекция конфигураций для вывода сообщений об ошибках в консоль и систему
//  -----------------------------------------------------------------------------;

import notifier from 'node-notifier';

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
    sass: 'Oops! Sass errored',
    njk: 'Oops! Nunjucks template errored',
    scripts: 'Oops! Scripts errored',
  },
};
