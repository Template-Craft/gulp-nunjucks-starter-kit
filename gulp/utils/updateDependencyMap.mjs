
'use strict';

import nodePath from 'node:path';

import { settings } from '../config/settings.mjs';
import { getDependencyCache, setDependencyCache } from './dependencyCache.mjs';

import { findComponentUsages } from './findComponentUsages.mjs';
import { findSectionUsages } from './findSectionUsages.mjs';
import { findTemplateUsages } from './findTemplatesUsages.mjs';

/**
 * Инкрементально обновляет карту зависимостей для одной сущности.
 *
 * @param {Object} options
 * @param {'component'|'section'|'template'} options.type - тип сущности
 * @param {string} options.name - имя сущности (например, 'Header', 'first_section', '_head')
 */
export async function updateDependencyMap({ type, name }) {
  const cache = getDependencyCache();

  if (!cache || !type || !name) return;

  if (type === 'template') name = name.replace(/^_/, '');
  // проверка типов
  const isComponent = type === 'component';
  const isSection = type === 'section';
  const isTemplate = type === 'template';

  // Определяем нужную часть кэша
  const currentMap = isComponent ? cache.components : isSection ? cache.sections : isTemplate ? cache.templates : null;

  if (!currentMap) return;

  // Исходный набор файлов, где сущность уже встречалась
  const knownFiles = new Set(currentMap.get(name) || []);

  // Пересканируем только knownFiles; если их нет (новая сущность) - узкий полный поиск по типу
  let usageMap;

  if (isComponent) {
    usageMap = knownFiles.size
      ? await findComponentUsages(app.path.src.nunjucksIndexDir, [...knownFiles])
      : await findComponentUsages(app.path.src.nunjucksIndexDir);
  } else if (isSection) {
    usageMap = knownFiles.size
      ? await findSectionUsages(app.path.src.nunjucksIndexDir, [...knownFiles])
      : await findSectionUsages(app.path.src.nunjucksIndexDir);
  } else {
    // template
    usageMap = knownFiles.size
      ? await findTemplateUsages(app.path.src.nunjucksIndexDir, [...knownFiles])
      : await findTemplateUsages(app.path.src.nunjucksIndexDir);
  }

  // Инвертируем результат: нам нужен список файлов, где конкретно встречается name
  const usedBy = new Set();
  for (const [file, usedNames] of usageMap.entries()) {
    if (usedNames.includes(name)) {
      usedBy.add(file);
    }
  }

  // Обновляем только целевую карту
  const newMap = new Map(currentMap);

  if (usedBy.size > 0) {
    newMap.set(name, Array.from(usedBy));
  } else {
    // Если в изместных местах больше не встречается - удаляем запись
    newMap.delete(name);
  }

  // Сохраняем обратно в кэш, не затирая остальное
  setDependencyCache({
    ...cache,
    ...(isComponent ? { components: newMap } : isSection ? { sections: newMap } : { templates: newMap }),
  });

  const label = isComponent ? 'component' : isSection ? 'section' : 'template';

  console.log(
    `[${app.plugins.chalk.blue('DependencyMap')}] Инкрементально обновлён "${app.plugins.chalk.magenta(label)}" -> файлов: ${app.plugins.chalk.magenta(usedBy.size)}`,
  );
}

/**
 * Синхронизирует карту зависимостей с точки зрения ИЗМЕНЁННОГО ФАЙЛА, а не сущности.
 *
 * updateDependencyMap() выше обновляет запись сущности (например "Header"), перепроверяя
 * только уже известные ей файлы - поэтому НОВЫЙ вызов getComponent/getSection/getTemplate,
 * впервые добавленный в странице/секции/компоненте, не попадает в кэш до полного ребилда.
 *
 * Эта функция решает обратную задачу: сканирует конкретный filePath и добавляет/удаляет
 * его из записей всех сущностей, которые он теперь использует (или перестал использовать).
 *
 * @param {string} filePath - абсолютный путь изменённого .njk файла
 */
export async function syncFileUsages(filePath) {
  const cache = getDependencyCache();
  if (!cache) return;

  const [componentUsage, sectionUsage, templateUsage] = await Promise.all([
    findComponentUsages(app.path.src.nunjucksIndexDir, [filePath]),
    findSectionUsages(app.path.src.nunjucksIndexDir, [filePath]),
    findTemplateUsages(app.path.src.nunjucksIndexDir, [filePath]),
  ]);

  const components = syncMapForFile(cache.components, filePath, componentUsage.get(filePath));
  const sections = syncMapForFile(cache.sections, filePath, sectionUsage.get(filePath));
  const templates = syncMapForFile(cache.templates, filePath, templateUsage.get(filePath));

  // Ничего не изменилось относительно этого файла - не трогаем кэш и не логируем
  if (!components.changed && !sections.changed && !templates.changed) return;

  setDependencyCache({
    components: components.map,
    sections: sections.map,
    templates: templates.map,
  });

  if (settings.cache.verbose) {
    console.log(
      `[${app.plugins.chalk.blue('DependencyMap')}] Синхронизация файла "${app.plugins.chalk.magenta(nodePath.relative(app.path.projectRoot, filePath))}" -> связи обновлены`,
    );
  }
}

/**
 * Приводит одну карту (components/sections/templates) в соответствие с актуальным
 * списком сущностей, которые использует filePath.
 * @returns {{map: Map, changed: boolean}}
 */
function syncMapForFile(map, filePath, usedNamesList) {
  if (!map) return { map: map, changed: false };

  const usedNames = new Set(usedNamesList || []);
  const newMap = new Map(map);
  let changed = false;

  // Добавляем filePath в сущности, которые он теперь использует
  for (const name of usedNames) {
    const files = new Set(newMap.get(name) || []);

    if (!files.has(filePath)) {
      files.add(filePath);
      newMap.set(name, Array.from(files));
      changed = true;
    }
  }

  // Убираем filePath из сущностей, которые он больше не использует
  for (const [name, files] of newMap.entries()) {
    if (usedNames.has(name) || !files.includes(filePath)) continue;

    const filtered = files.filter((file) => file !== filePath);
    changed = true;

    if (filtered.length > 0) {
      newMap.set(name, filtered);
    } else {
      newMap.delete(name);
    }
  }

  return { map: newMap, changed: changed };
}
