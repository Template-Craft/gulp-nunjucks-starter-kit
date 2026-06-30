/* eslint-disable n/no-unpublished-import */

'use strict';

import fg from 'fast-glob';
import fs from 'node:fs/promises';

import { stripComments } from './stripComments.mjs';

// const TEMPLATE_USAGE_REGEX = /(?:\{%\s*(?:include|import|from)\s+['"]templates\/(_?[a-zA-Z0-9-]+)\.njk['"])/g;
const TEMPLATE_USAGE_REGEX = /getTemplate\(\s*['"]([a-zA-Z0-9_-]+)['"]\s*\)/g;

// Глоб для поиска только нужных .njk, исключая components/ и templates/
const DEFAULT_GLOB = '**/*.njk';
// const IGNORE_PATHS = ['**/components/**', '**/sections/**', '**/templates/**'];

/**
 * Ищет, какие шаблоны из templates/ используются в каких файлах
 * @param {string} baseDir — директория для поиска (обычно path.usageMap)
 * @returns {Promise<Map<string, string[]>>} — Map<absoluteFilePath, usedTemplateNames[]>
 */
export async function findTemplateUsages(baseDir, files) {
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
          // ignore: IGNORE_PATHS,
          // modern mode по умолчанию работает, если Node.js ≥ 14.18 / ≥ 16.0
        });

  const usageMap = new Map();

  await Promise.all(
    njkFiles.map(async (file) => {
      try {
        const raw = await fs.readFile(file, 'utf8');
        const content = stripComments(raw);
        const matches = [...content.matchAll(TEMPLATE_USAGE_REGEX)];

        if (matches.length > 0) {
          const usedTemplates = matches.map((m) => m[1]).sort();
          usageMap.set(file, usedTemplates);
        }
      } catch (err) {
        console.warn(`⚠️ Не удалось прочитать файл: ${file}`, err);
      }
    }),
  );

  return usageMap;
}
