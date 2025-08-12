/* eslint-disable n/no-unpublished-import */
/**
 * Функция поиска всех вхождений getComponent('ComponentName') в .njk файлах;
 *
 * Возвращает Map, где ключ - путь к файлу .njk,
 * а назначение - список имён компонентов, найденных в этом файле;
 */

'use strict';

import fs from 'node:fs/promises';
import fg from 'fast-glob';

import { stripComments } from './stripComments.mjs';

// паттерн поиска getComponent(...)
const GET_COMPONENT_REGEX = /getComponent\(\s*['"]([\w\-]+)['"]\s*\)/g;

// Глоб для поиска только нужных .njk, исключая components/ и templates/
const DEFAULT_GLOB = '**/*.njk';
const IGNORE_PATHS = ['**/templates/**'];

/**
 * Ищет вхождения getComponent('ComponentName') в указанных файлах или во всех .njk файлах.
 * @param {string} baseDir - Базовая директория поиска
 * @param {string[]} [files] - Необязательный список абсолютных путей для инкрементального поиска
 * @returns {Promise<Map<string, string[]>>}
 */
export async function findComponentUsages(baseDir, files) {
  const njkFiles =
    files && files.length
      ? files
      : await fg(DEFAULT_GLOB, {
          cwd: baseDir,
          absolute: true,
          onlyFiles: true,
          dot: false,
          unique: true,
          suppressErrors: true,
          ignore: IGNORE_PATHS,
          // modern mode по умолчанию работает, если Node.js ≥ 14.18 / ≥ 16.0
        });

  const usageMap = new Map();

  await Promise.all(
    njkFiles.map(async (file) => {
      try {
        const raw = await fs.readFile(file, 'utf8');
        const content = stripComments(raw);

        const used = new Set();

        // Стандартный getComponent('Name')
        for (const m of content.matchAll(GET_COMPONENT_REGEX)) {
          if (m[1]) used.add(m[1]);
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
