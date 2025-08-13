/* eslint-disable n/no-unpublished-import */
/* eslint-disable no-undef */

//  ---------------------------------------------------------------------;
//    Здесь мы храним коллекцию оповещений для проекта,
//    а именно: оповещение о запуске, оповещение о конце сборки проекта
//  ---------------------------------------------------------------------;

'use strict';

export function send(title, message, timeout = 4) {
  app.plugins.notifier.notify({
    title: title,
    message: message,
    sound: false,
    timeout: timeout,
    'app-name': app.pkg.appName,
  });
}

export const createNotification = () => {
  const devModMessage = 'проект запущен, хорошего кодинга!';
  const buildModMessage = 'проверьте наличие папки build в родительской директории.';

  const consoleInfo = `
    ${app.pkg.informerHeader}

      ${app.pkg.titleColor('- About:')}
      App: ${app.pkg.appName}
      Version: ${app.pkg.appVersion}
      License: ${app.pkg.appLicense}

      ${app.pkg.titleColor('- System:')}
      OS: ${app.pkg.os}
      Platform: ${app.pkg.platform}
      Arch: ${app.pkg.arch}

      ${app.pkg.titleColor('- Runtime:')}
      Runtime: ${app.pkg.runtimeVersion}
      Mode: ${app.pkg.mode}

    ${app.pkg.informderFooter}
  `;

  send(app.isDev ? 'Привет мир!' : 'Сборка завершена', app.isDev ? devModMessage : buildModMessage, 4);

  console.info(consoleInfo);
};
