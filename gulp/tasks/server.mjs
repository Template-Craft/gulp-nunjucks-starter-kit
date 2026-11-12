 

//  -------------------------------------------------------------;
//    Таск-раннер конфигурации локального сервера.
//  -------------------------------------------------------------;

'use strict';

import { createNotification, send as notifySend } from './notify.mjs';
import { t } from '../i18n/index.mjs';

export const server = () => {
  app.plugins.browsersync.init(
    {
      watch: true,
      notify: false,
      port: 8080,
      // Внутри Docker-контейнера открывать браузер некому - см. docker-compose.yml
      open: process.env.IN_DOCKER ? false : true,
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
        notifySend(t('notify.serverError'), error.message ?? String(error), 4);
        return;
      }

      // Сервер запущен: вызываем приветственный баннер только в dev
      if (app.isDev) createNotification();
    },
  );
};
