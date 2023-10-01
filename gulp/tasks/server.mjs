// Настройки локального сервера
/* global app */

//  -------------------------------------------------------------;
//    Таск-раннер конфигурации локального сервера.
//  -------------------------------------------------------------;

'use strict';

export const server = (done) => {
  app.plugins.browsersync.init({
    server: {
      baseDir: `${app.path.build.html}`,
    },
    notify: false,
    posrt: 3005,
  });
};
