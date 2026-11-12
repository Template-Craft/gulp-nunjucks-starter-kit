// Настройки проекта

import os from 'node:os';

const CORES = os.cpus().length;

// os.totalmem() всегда возвращает память ХОСТА, даже если процесс запущен
// в контейнере с ограничением по памяти (docker-compose mem_limit/deploy.resources).
// DOCKER_MEM_LIMIT_MB (см. docker-compose.yml) позволяет явно указать реальный
// лимит контейнера, чтобы порог монитора считался от него, а не от памяти хоста.
const dockerMemLimitMB = process.env.DOCKER_MEM_LIMIT_MB ? Number(process.env.DOCKER_MEM_LIMIT_MB) : null;
const totalMemoryMB = dockerMemLimitMB || os.totalmem() / 1024 / 1024;

export const settings = {
  isMultipage: false, // false = langing pages, true = multipage project
  debug: false, // default
  // Язык консольного вывода (gulp/i18n/). Если указанного языка нет в словарях
  // или в нём нет конкретной строки - используется английский (фоллбэк и язык по умолчанию).
  locale: 'en',
  // Контроль кэша
  cache: {
    autoRebuild: true, // Перестроить кэш при старте (dev режим)
    maxMemoryMB: 300, // Лимит памяти, при превышении - сброс
    verbose: true, // Показывать логи использования кэша
    debugTables: false, // Выводить таблицы даже при использовании кэша
  },
  monitor: {
    maxMemoryMB: Math.round(totalMemoryMB * 0.15), // 15% ОЗУ (хоста или DOCKER_MEM_LIMIT_MB) или просто: maxMemoryMB: 1500
    maxCpuPercent: CORES * 60, // или просто: maxCpuPercent: 250
    intervalMs: 10_000,
  },
};
