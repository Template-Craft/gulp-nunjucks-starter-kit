/* eslint-disable n/no-unpublished-import */
'use strict';

import fs from 'node:fs/promises';
import fg from 'fast-glob';

import { settings } from '../config/settings.mjs';
import { stripComments } from './stripComments.mjs';

// паттерн поиска getSection(...)
const GET_SECTION_REGEX = /\{%\s*include\s+getSection\(([^)]*)\)\s*%\}/g;

// Глоб для поиска только нужных .njk, исключая components/ и templates/
const DEFAULT_GLOB = '**/*.njk';
// const IGNORE_PATHS = ['**/templates/**'];

/**
 * Ищет вхождения {% include getSection(...) %} в указанных файлах или во всех .njk файлах.
 * @param {string} baseDir - Базовая директория поиска
 * @param {string[]} [files] - Необязательный список абсолютных путей для инкрементального поиска
 * @returns {Promise<Map<string, string[]>>}
 */
export async function findSectionUsages(baseDir, files) {
  const njkFiles =
    files && files.length
      ? files
      : await fg(DEFAULT_GLOB, {
          cwd: baseDir,
          absolute: true,
          onlyFiles: true,
          unique: true,
          suppressErrors: true,
          // ignore: IGNORE_PATHS,
        });

  const usageMap = new Map();

  await Promise.all(
    njkFiles.map(async (file) => {
      try {
        const raw = await fs.readFile(file, 'utf8');
        const content = stripComments(raw);
        const used = new Set();

        for (const m of content.matchAll(GET_SECTION_REGEX)) {
          const args = m[1].split(',').map((a) => a.trim().replace(/^['"]|['"]$/g, ''));

          if (settings.isMultipage) {
            const [pageName, sectionName] = args;
            if (pageName && sectionName) used.add(`${pageName}/${sectionName}`);
          } else {
            const [, sectionName] = args;
            if (sectionName) used.add(sectionName);
          }
        }

        if (used.size > 0) {
          usageMap.set(file, Array.from(used));
        }
      } catch (err) {
        console.warn(`⚠️ Не удалось прочитать файл: ${file}\n`, err);
      }
    }),
  );

  return usageMap;
}
