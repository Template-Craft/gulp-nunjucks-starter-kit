/* eslint-disable no-undef */

//  -------------------------------------------------------------;
//    Таск-раннер конфигурации локального сервера.
//  -------------------------------------------------------------;

'use strict';

import { createNotification, send as notifySend } from './notify.mjs';

export const server = () => {
  app.plugins.browsersync.init(
    {
      watch: true,
      notify: false,
      port: 8080,
      server: {
        baseDir: app.path.build.html,
      },
      // Режим призрака, это когда отражаются действия на другом устройстве
      // При кликах, работой с формами, и скролле страниц
      ghostMode: false,
    },
    (error) => {
      // Старт сервера не удался - фиксируем ошибку
      if (error) {
        notifySend('Gulp ошибка старта сервера', error.message ?? String(error), 4);
        return;
      }

      // Сервер запущен: вызываем приветственный баннер только в dev
      if (app.isDev) createNotification();
    },
  );
};
