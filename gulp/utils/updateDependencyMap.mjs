/* eslint-disable no-undef */
'use strict';

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
