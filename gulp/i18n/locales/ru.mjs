'use strict';

// Русский словарь
export default {
  'cache.init': 'Инициализация кэша зависимостей...',
  'cache.setCalled': 'setDependencyCache вызван.',
  'cache.memoryUsage': 'задействовано памяти:',
  'cache.counts': 'Компонентов в кэшэ: {{components}}, секций в кэшэ: {{sections}}, шаблонов: {{templates}}',
  'cache.reset': 'Кэш сброшен ({{reason}})',
  'cache.memoryLimitExceeded': 'Превышен лимит памяти: {{used}} MB',
  'cache.usedFromCache': 'КЭШ зависимостей',
  'cache.usedFresh': 'НОВЫЙ АНАЛИЗ зависимостей',
  'cache.componentsStat': 'компоненты: {{count}} (в {{files}} файлах)',
  'cache.sectionsStat': 'секции: {{count}} (в {{files}} файлах)',
  'cache.templatesStat': 'шаблоны: {{count}} (в {{files}} файлах)',

  'debug.noData': 'Нет данных для {{label}}',
  'debug.tableSummary': 'dependencyMap -> {{label}}s: {{count}} шт.',
  'table.fileCount': 'Кол-во файлов',
  'table.usedIn': 'Используется в',

  'monitor.notificationTitle': 'Gulp monitor',
  'monitor.resourceExceeded': 'Порог ресурсов превышен',
  'monitor.statFailed': 'не удалось получить статистику: {{error}}',

  'watcher.changed': 'Изменён:',

  'notify.startError': 'Gulp ошибка старта',
  'notify.buildError': 'Gulp ошибка сборки',
  'notify.serverError': 'Gulp ошибка старта сервера',
  'notify.devMessage': 'проект запущен, хорошего кодинга!',
  'notify.buildMessage': 'проверьте наличие папки build в родительской директории.',
  'notify.devTitle': 'Привет мир!',
  'notify.buildTitle': 'Сборка завершена',

  'info.sectionAbout': 'О проекте',
  'info.app': 'Приложение',
  'info.version': 'Версия',
  'info.license': 'Лицензия',
  'info.sectionSystem': 'Система',
  'info.os': 'ОС',
  'info.platform': 'Платформа',
  'info.arch': 'Архитектура',
  'info.sectionRuntime': 'Среда выполнения',
  'info.runtimeLabel': 'Среда',
  'info.modeLabel': 'Режим',
  'info.modeDev': 'Разработка',
  'info.modeProd': 'Продакшн',

  'errors.sass': 'Ой! Ошибка Sass',
  'errors.njk': 'Ой! Ошибка шаблона Nunjucks',
  'errors.scripts': 'Ой! Ошибка скриптов',
  'errors.json': 'Ой! Ошибка Json',
  'errors.vendors': 'Ой! Ошибка стороннего плагина',
  'errors.assets': 'Ой! Ошибка файла ассетов',

  'styles.initBuild': 'Инициализация сборки main.scss',

  'depmap.incrementalUpdate': 'Инкрементально обновлён "{{label}}" -> файлов: {{count}}',
  'depmap.fileSynced': 'Синхронизация файла "{{path}}" -> связи обновлены',

  'common.none': '(нет)',
  'common.readFileFailed': '⚠️ Не удалось прочитать файл: {{file}}',

  'nunjucks.jsonDirectPage': 'Обновлён JSON {{name}} -> пересборка только страницы "{{page}}.njk"',
  'nunjucks.jsonLinkedRebuild': 'Обновлён JSON {{name}} -> связан с сущностью -> пересборка {{count}} файла(ов):',
  'nunjucks.jsonNoLinks': 'Обновлён JSON {{name}} -> нет связей -> пересборка всех страниц',
  'nunjucks.globalJson': 'Обновлён глобальный JSON ({{name}}) -> пересборка всех страниц',
  'nunjucks.pageUpdated': 'Обновлён шаблон страницы -> пересборка "{{name}}"',
  'nunjucks.componentUpdated': 'Обновлён компонент "{{name}}" -> пересборка файла(ов):',
  'nunjucks.sectionUpdated': 'Обновлена секция "{{name}}" -> пересборка файла(ов):',
  'nunjucks.templateUpdated': 'Обновлён шаблон "{{name}}" -> пересборка файла(ов):',
  'nunjucks.updateNoLinks': 'Обновление "{{name}}" -> нет связей, пересборка всех страниц',
  'nunjucks.unknownOrFull': 'Неизвестное изменение или полный рендер -> пересборка всех страниц',
};
