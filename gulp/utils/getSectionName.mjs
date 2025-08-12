import nodePath from 'node:path';
import { settings } from '../config/settings.mjs';

/**
 * Получает имя секции в формате, который используется в findSectionUsages:
 * - "sectionName" (если landing page)
 * - "pageName/sectionName" (если multipage)
 */
export function getSectionNameFromPath(filePath) {
  const fileName = nodePath.basename(filePath, '.njk').replace(/^_/, '');
  const dirName = nodePath.basename(nodePath.dirname(filePath));

  if (settings.isMultipage) {
    return `${dirName}/${fileName}`;
  }

  return fileName;
}
