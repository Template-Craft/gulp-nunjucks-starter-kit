/* eslint-disable n/no-unpublished-import */
/* eslint-disable no-undef */
//  ---------------------------------------------------------------------;
//    Здесь мы храним коллекцию оповещений для проекта,
//    а именно: оповещение о запуске, оповещение о конце сборки проекта
//  ---------------------------------------------------------------------;

'use strict';

import notifier from 'node-notifier';

const devModeAlert = (done) => {
  notifier.notify({
    title: 'Привет Мир!',
    message: 'проект запущен, хорошего кодинга!',
    sound: false,
    timeout: 4,
    'app-name': 'gulp-nunjucks-starter-kit',
  });

  return done();
};

const buildModeAlert = (done) => {
  notifier.notify({
    title: 'Сборка завершена',
    message: 'проверьте в родительской директории, наличие папки build',
    sound: false,
    timeout: 4,
    'app-name': 'gulp-nunjucks-starter-kit',
  });

  return done();
};

// функция, которая проверяет в каком режиме мы сейчас находимся,
//  -> если isDev true  то вызываем оповещение devModeAlert();
//  -> или isDev false  то вызываем оповещение buildModeAlert();
export const modeStateNotifier = (done) => {
  if (app.isDev) {
    devModeAlert(done);
  } else {
    buildModeAlert(done);
  }
};
