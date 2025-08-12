// Настройки проекта

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
};
