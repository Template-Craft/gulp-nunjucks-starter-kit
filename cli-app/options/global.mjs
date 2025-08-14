// Собираем глобальные опции, используемые повсюду

import { KITSYS } from '../config/config.mjs';
const node_path = KITSYS.node_path;

export const GLOBALOPTIONS = {
  path: {
    alias: 'p',
    type: 'string',
    describe: 'после ввода -p или --path, укажите путь до файла или дир-рии',
    // приводим значение к абсолютному пути, чтобы utils не думали о платформе
    coerce: (p) => (p ? node_path.resolve(p) : p),
  },
};
