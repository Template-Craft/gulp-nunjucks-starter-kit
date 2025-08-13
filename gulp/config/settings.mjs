// Настройки проекта

import os from 'node:os';

const CORES = os.cpus().length;

export const settings = {
  isMultipage: false, // false = langing pages, true = multipage project
  debug: false, // default
  // Контроль кэша
  cache: {
    autoRebuild: true, // Перестроить кэш при старте (dev режим)
    maxMemoryMB: 300, // Лимит памяти, при превышении - сброс
    verbose: true, // Показывать логи использования кэша
    debugTables: false, // Выводить таблицы даже при использовании кэша
  },
  monitor: {
    maxMemoryMB: Math.round((os.totalmem() / 1024 / 1024) * 0.15), // 15% ОЗУ или просто: maxMemoryMB: 1500
    maxCpuPercent: CORES * 60, // или просто: maxCpuPercent: 250
    intervalMs: 10_000,
  },
};
