 
 

//  ---------------------------------------------------------------------;
//    Здесь мы храним коллекцию оповещений для проекта,
//    а именно: оповещение о запуске, оповещение о конце сборки проекта
//  ---------------------------------------------------------------------;

'use strict';

import { t } from '../i18n/index.mjs';

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
  const devModMessage = t('notify.devMessage');
  const buildModMessage = t('notify.buildMessage');

  const consoleInfo = `
    ${app.pkg.informerHeader}

      ${app.pkg.titleColor(`- ${t('info.sectionAbout')}:`)}
      ${t('info.app')}: ${app.pkg.appName}
      ${t('info.version')}: ${app.pkg.appVersion}
      ${t('info.license')}: ${app.pkg.appLicense}

      ${app.pkg.titleColor(`- ${t('info.sectionSystem')}:`)}
      ${t('info.os')}: ${app.pkg.os}
      ${t('info.platform')}: ${app.pkg.platform}
      ${t('info.arch')}: ${app.pkg.arch}

      ${app.pkg.titleColor(`- ${t('info.sectionRuntime')}:`)}
      ${t('info.runtimeLabel')}: ${app.pkg.runtimeVersion}
      ${t('info.modeLabel')}: ${app.pkg.mode}

    ${app.pkg.informderFooter}
  `;

  send(app.isDev ? t('notify.devTitle') : t('notify.buildTitle'), app.isDev ? devModMessage : buildModMessage, 4);

  console.info(consoleInfo);
};
