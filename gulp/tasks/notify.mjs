/* eslint-disable no-undef */

//  ---------------------------------------------------------------------;
//    Здесь мы храним коллекцию оповещений для проекта,
//    а именно: оповещение о запуске, оповещение о конце сборки проекта
//  ---------------------------------------------------------------------;

'use strict';

export const createNotification = async () => {
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

  await app.plugins.notifier.notify({
    title: app.isDev ? 'Привет мир!' : 'Сборка завершена',
    message: app.isDev ? `${devModMessage}` : `${buildModMessage}`,
    sound: false,
    timeout: 4,
    'app-name': `${app.pkg.appName}`,
  });

  console.info(consoleInfo);
};
