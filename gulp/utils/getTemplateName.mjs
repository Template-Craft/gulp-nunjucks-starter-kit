import nodePath from 'node:path';

export function getTemplateName(filePath) {
  return nodePath.basename(filePath, '.njk').replace(/^_/, '');
}
