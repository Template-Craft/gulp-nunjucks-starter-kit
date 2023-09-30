// Настройки локального сервера
/* global app */

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
