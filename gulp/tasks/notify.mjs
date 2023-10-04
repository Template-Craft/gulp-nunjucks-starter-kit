/* eslint-disable n/no-unpublished-import */
/* eslint-disable no-undef */
//  ---------------------------------------------------------------------;
//    Здесь мы храним коллекцию оповещений для проекта,
//    а именно: оповещение о запуске, оповещение о конце сборки проекта
//  ---------------------------------------------------------------------;

'use strict';

import os from 'node:os';

import chalk from 'chalk';

import notifier from 'node-notifier';

export const createNotification = async () => {
  const devModMessage = 'проект запущен, хорошего кодинга!';
  const buildModMessage = 'проверьте наличие папки build в родительской директории.';

  const consoleInfo = `
    ${chalk.yellow('------------ * ------------')}
    OS: ${chalk.yellow(os.type)}
    Arch: ${chalk.blue(os.arch)}
    Platform: ${chalk.yellow(os.platform)}
    ${chalk.yellow('------------ * ------------')}
    Node Version: ${chalk.green(process.env.npm_config_user_agent)}
    Mode: ${chalk.green(app.isDev ? 'Development' : 'Production')}
    ${chalk.yellow('------------ * ------------')}
  `;

  await notifier.notify({
    title: app.isDev ? 'Привет мир!' : 'Сборка завершена',
    message: app.isDev ? `${devModMessage}` : `${buildModMessage}`,
    sound: false,
    timeout: 4,
    'app-name': 'Gulp-Nunjucks-Starter-Kit',
  });

  console.info(consoleInfo);
};
