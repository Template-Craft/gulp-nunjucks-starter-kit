// Пути
'use strict';

import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve()); // -> получаем корневую дир-ию

const buildFolder = './build';
const srcFolder = './src';

// объект с путями к файлам и папкам:
export const path = {
  build: {
    files: `${buildFolder}/`,
  },
  src: {
    nunjucks: `${srcFolder}/views/pages/*.+(html|njk|nunjucks|tpl|nj)`,
    files: `${srcFolder}/**/*.*`,
  },
  watch: {
    files: `${srcFolder}/**/*.*`,
  },
  clean: buildFolder,
  srcFolder: srcFolder,
  rootFolder: rootFolder,
};
