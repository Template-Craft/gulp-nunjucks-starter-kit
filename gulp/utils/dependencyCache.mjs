/* eslint-disable no-undef */
/**
 * Кэширование dependencyMap
 */

'use strict';

import nodePath from 'node:path';

import { settings } from '../config/settings.mjs';

const cache = {
  components: null,
  sections: null,
  templates: null,
  timestamp: null,
};

// Сохранение кэша
export function setDependencyCache({ components, sections, templates }) {
  // проверка на существование кэша
  if (
    isSameMap(cache.components, components) &&
    isSameMap(cache.sections, sections) &&
    isSameMap(cache.templates, templates)
  ) {
    return; // Ничего не изменилось - пропускаем
  }

  cache.components = components;
  cache.sections = sections;
  cache.templates = templates;
  cache.timestamp = Date.now();

  if (settings.cache.verbose) {
    console.log(`[${app.plugins.chalk.magenta('Cache')}] setDependencyCache вызван.`);
    logMemoryUsage();
  }

  maybeInvalidateByMemory(); // проверка превышения лимита веса кэша
}

// Получение кэша
export function getDependencyCache() {
  return {
    components: cache.components,
    sections: cache.sections,
    templates: cache.templates,
    timestamp: cache.timestamp,
  };
}

// Проверка наличия кэша
export function hasDependencyCache() {
  return cache.components !== null || cache.sections !== null || cache.templates !== null;
}

// Очистка кэша
export function clearDependencyCache(reason = 'Неизвестно') {
  cache.components = null;
  cache.sections = null;
  cache.templates = null;
  cache.timestamp = null;

  if (settings.cache.verbose) {
    console.log(`[${app.plugins.chalk.red('Cache')}] Кэш сброшен (${reason})`);
  }
}

/**
 * Логирует использование карты зависимостей (components/sections),
 * может работать как для данных из кэша, так и для нового анализа.
 *
 * @param {Object} options
 * @param {boolean} options.includeComponents - Логировать данные по компонентам
 * @param {boolean} options.includeSections - Логировать данные по секциям
 * @param {Map} [options.components] - Карта зависимостей компонентов
 * @param {Map} [options.sections] - Карта зависимостей секций
 * @param {boolean} [options.fromCache=true] - Источник данных: кэш или новый анализ
 */

let lastLogKey = '';
let lastLogTime = 0;

export function logCacheUsed({
  includeComponents = true,
  includeSections = true,
  includeTemplates = true,
  components,
  sections,
  templates,
  fromCache = true, // по умолчанию считаем, что данные пришли из кэша
} = {}) {
  if (!settings.cache.verbose) return; // Логируем только если включён verbose-режим

  const now = Date.now();
  const key = `comp:${includeComponents}-sect:${includeSections}-cache:${fromCache}`;

  // Антиспам: блокируем вывод одинакового лога слишком часто (менее 100мс)
  if (key === lastLogKey && now - lastLogTime < 100) return;
  lastLogKey = key;
  lastLogTime = now;

  // Считаем страницы
  const compCount = includeComponents ? components?.size || 0 : 0;
  const componentFiles = includeComponents ? new Set([...(components?.values() || [])].flat()).size : 0;

  const sectCount = includeSections ? sections?.size || 0 : 0;
  const sectionFiles = includeSections ? new Set([...(sections?.values() || [])].flat()).size : 0;

  const templCount = templates?.size || 0;
  const templFiles = new Set([...(templates?.values() || [])].flat()).size;

  // Формируем текстовую часть
  const parts = [];
  if (includeComponents) {
    parts.push(`компоненты: ${app.plugins.chalk.blue(compCount)} (в ${app.plugins.chalk.blue(componentFiles)} файлах)`);
  }

  if (includeSections) {
    parts.push(`секции: ${app.plugins.chalk.blue(sectCount)} (в ${app.plugins.chalk.blue(sectionFiles)} файлах)`);
  }

  if (includeTemplates) {
    parts.push(`шаблоны: ${app.plugins.chalk.blue(templCount)} (в ${app.plugins.chalk.blue(templFiles)} файлах)`);
  }

  const sourceLabel = fromCache
    ? app.plugins.chalk.blueBright('КЭШ зависимостей')
    : app.plugins.chalk.yellow('НОВЫЙ АНАЛИЗ зависимостей');

  console.log(`[${app.plugins.chalk.magenta('Cache')}] ${sourceLabel} -> ${parts.join(' | ')}`);

  // В режиме отладки - вывод подробной таблицы но только если есть кэш
  if (settings.cache.debugTables || (settings.debug && !fromCache)) {
    if (includeComponents && components?.size) {
      logDependencyTable('Component', components);
    }

    if (includeSections && sections?.size) {
      logDependencyTable('Section', sections);
    }

    if (includeTemplates && templates?.size) {
      logDependencyTable('Templates', templates);
    }
  }
}

// Проверка данных кэша, если ничего не менялось - то не обновляем кэш
// строгая проверка с сортировкой
function isSameMap(mapA, mapB) {
  if (mapA === mapB) return true;
  if (!mapA || !mapB || mapA.size !== mapB.size) return false;

  for (const [key, valA] of mapA.entries()) {
    const valB = mapB.get(key);
    if (!Array.isArray(valA) || !Array.isArray(valB)) return false;
    if (valA.length !== valB.length) return false;

    const sortedA = [...valA].sort();
    const sortedB = [...valB].sort();
    if (!sortedA.every((val, i) => val === sortedB[i])) return false;
  }

  return true;
}

// Сброс при превышении лимита памяти
function maybeInvalidateByMemory() {
  const used = process.memoryUsage().heapUsed / 1024 / 1024;

  if (used > settings.cache.maxMemoryMB) {
    clearDependencyCache(`[${app.plugins.chalk.red('Cache')}] Превышен лимит памяти: ${Math.round(used)} MB`);
  }
}

// Вывод информации в консоль
function logMemoryUsage() {
  const used = process.memoryUsage();
  console.log(`[${app.plugins.chalk.magenta('Cache')}] задействовано памяти:`);

  for (const key in used) {
    const mb = Math.round((used[key] / 1024 / 1024) * 100) / 100;
    console.log(` ${app.plugins.chalk.greenBright(key.padEnd(15))} -> ${mb} MB`);
  }

  const componentCount = cache.components?.size || 0;
  const sectionCount = cache.sections?.size || 0;
  const templCount = cache.templates?.size || 0;

  console.log(
    `[${app.plugins.chalk.magenta('Cache')}] Компонентов в кэшэ: ${app.plugins.chalk.blue(componentCount)}, секций в кэшэ: ${app.plugins.chalk.blue(sectionCount)}, шаблонов: ${app.plugins.chalk.blue(templCount)}`,
  );
}

/**
 * Выводит таблицу зависимостей (компонентов или секций)
 * @param {string} label - Метка для первой колонки (например, "Component" или "Section")
 * @param {Map<string, string[]>} mapData - Карта зависимостей: ключ — имя, значение — массив файлов
 */
function logDependencyTable(label, mapData) {
  if (!mapData || mapData.size === 0) {
    console.log(`[${app.plugins.chalk.yellow('DEBUG')}] Нет данных для ${label.toLowerCase()}s`);
    return;
  }

  const tableResultData = [];

  for (const [name, filePaths] of mapData.entries()) {
    const relativePaths = filePaths.map((path) => nodePath.relative(app.path.projectRoot, path));

    tableResultData.push({
      [label]: name,
      'Кол-во файлов': relativePaths.length,
      /* prettier-ignore */
      'Используется в': relativePaths.join(', ') || '(нет)',
    });
  }

  console.log(
    `[${app.plugins.chalk.yellow('DEBUG')}] dependencyMap -> ${label.toLocaleLowerCase()}s: ${mapData.size} шт.`,
  );
  console.table(tableResultData);
}
