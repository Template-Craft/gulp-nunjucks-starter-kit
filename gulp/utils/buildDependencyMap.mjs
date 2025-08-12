/* eslint-disable object-shorthand */
/* eslint-disable no-undef */

/**
 * Строим карту зависимостей между страницами и компонентами, а затем реализовываем определение,
 * какие страницы пересобирать при изменении компонента.
 *
 * Строится карта зависимостей компонентов - т.е. функция выясняет,
 * где именно в проекте используется каждый компонент, включая:
 * страницы           pages/
 * секции             sections/
 * другие компоненты  components/,
 * которые могут в свою очередь быть вложены в страницы или секции
 */

'use strict';

import { path } from '../config/path.mjs';

import {
  hasDependencyCache,
  getDependencyCache,
  setDependencyCache,
  logCacheUsed,
} from './dependencyCache.mjs';

import { findComponentUsages } from './findComponentUsages.mjs';
import { findSectionUsages } from './findSectionUsages.mjs';
import { findTemplateUsages } from './findTemplatesUsages.mjs';

/**
 * Собирает карту зависимостей компонентов и/или секций с использованием кэша.
 * @param {Object} options
 * @param {boolean} options.includeComponents - Включить ли анализ компонентов
 * @param {boolean} options.includeSections - Включить ли анализ секций
 * @returns {Promise<{ components?: Map<string, string[]>, sections?: Map<string, string[]> }>}
 */
export async function buildDependencyMap({
  includeComponents = true,
  includeSections = true,
  includeTemplates = true,
} = {}) {
  // Если в кэшэ уже есть данные - возвращаем их
  if (hasDependencyCache()) {
    const cached = getDependencyCache();
    const components = includeComponents ? cached.components : undefined;
    const sections = includeSections ? cached.sections : undefined;
    const templates = includeTemplates ? cached.templates : undefined;

    logCacheUsed({
      includeComponents,
      includeSections,
      includeTemplates,
      components,
      sections,
      templates,
      fromCache: true, // явно говорим, что это кэш
    });

    return { components, sections, templates };
  }

  // готовим задачи для параллельного анализа
  const tasks = [];

  if (includeComponents) {
    tasks.push(buildComponentDependencyMap(path.usageMap));
  } else {
    tasks.push(undefined);
  }

  if (includeSections) {
    tasks.push(buildSectionDependencyMap(path.usageMap));
  } else {
    tasks.push(undefined);
  }

  if (includeTemplates) {
    tasks.push(buildTemplateDependencyMap(path.usageMap));
  } else {
    tasks.push(undefined);
  }

  // Запускаем оба анализа параллельно
  const [components, sections, templates] = await Promise.all(tasks);

  const result = {};
  if (components) result.components = components;
  if (sections) result.sections = sections;
  if (templates) result.templates = templates;

  setDependencyCache(result); // кэшируем результат

  // Логируем как новый анализ
  logCacheUsed({
    includeComponents,
    includeSections,
    includeTemplates,
    components,
    sections,
    templates,
    fromCache: false,
  });

  return result;
}

/**
 * Строит карту зависимостей для компонентов: { componentName => [pages...] }
 */
async function buildComponentDependencyMap(baseDir) {
  const usageMap = await findComponentUsages(baseDir);

  // Map: { componentName => Set<pageFilePath> }
  const dependencyMap = new Map();

  for (const [filePath, usedComponents] of usageMap.entries()) {
    for (const componentName of usedComponents) {
      // Добавим, если ещё нет
      if (!dependencyMap.has(componentName)) {
        dependencyMap.set(componentName, new Set());
      }

      dependencyMap.get(componentName).add(filePath);
    }
  }

  return convertSetsToArray(dependencyMap);
}

/**
 * Строит карту зависимостей для секций: { sectionName => [pages...] }
 */
async function buildSectionDependencyMap(baseDir) {
  const usageMap = await findSectionUsages(baseDir);

  // Map: { componentName => Set<pageFilePath> }
  const dependencyMap = new Map();

  for (const [filePath, sectionNames] of usageMap.entries()) {
    for (const sectionName of sectionNames) {
      // Добавим, если ещё нет
      if (!dependencyMap.has(sectionName)) {
        dependencyMap.set(sectionName, new Set());
      }

      dependencyMap.get(sectionName).add(filePath);
    }
  }

  return convertSetsToArray(dependencyMap);
}

/**
 * Строит карту зависимостей для шаблонов templates/: { templateName => [files...] }
 */
async function buildTemplateDependencyMap(baseDir) {
  const usageMap = await findTemplateUsages(baseDir);

  // Map: { templateName => Set<filePath> }
  const dependencyMap = new Map();

  for (const [filePath, usedTemplates] of usageMap.entries()) {
    for (const templateName of usedTemplates) {
      if (!dependencyMap.has(templateName)) {
        dependencyMap.set(templateName, new Set());
      }

      dependencyMap.get(templateName).add(filePath);
    }
  }

  // // Вызов отладочной таблицы (если debug активен)
  // if (settings.debug) {
  //   logDependencyTable('Template', dependencyMap);
  // }

  return convertSetsToArray(dependencyMap);
}

/**
 * Преобразует Map<key, Set> в Map<key, string[]>
 */
function convertSetsToArray(inputMap) {
  const result = new Map();

  for (const [key, valueSet] of inputMap.entries()) {
    result.set(key, Array.from(valueSet));
  }

  return result;
}
