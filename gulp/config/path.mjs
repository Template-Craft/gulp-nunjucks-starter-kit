// Пути
'use strict';

import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve()); // -> получаем корневую дир-ию

const buildFolder = './build';
const srcFolder = './src';

// объект с путями к файлам и папкам:
export const path = {
  build: {
    html: `${buildFolder}/`,
    styles: `${buildFolder}/styles/`,
    scripts: `${buildFolder}/scripts/`,
    images: `${buildFolder}/assets/img/`,
    fonts: `${buildFolder}/assets/fonts/`,
  },
  src: {
    nunjucks: `${srcFolder}/views/pages/*.+(html|njk|nunjucks|nj)`,
    nunjucksRenderSrcFolder: `${srcFolder}/views/`,
    nunjucksData: `${srcFolder}/views/components/**/*.json`,
    globalData: `${srcFolder}/views/data/db.json`,
    styles: [`${srcFolder}/styles/main.scss`, `${srcFolder}/styles/vendor.scss`],
    scripts: `${srcFolder}/scripts/main/app.{cjs,js,mjs}`,
    images: `${srcFolder}/assets/img/**/*.{jpg,jpeg,png,gif,tiff,svg,webp}`,
    fonts: `${srcFolder}/assets/fonts/**/*.{woff,woff2,ttf}`,
  },
  watch: {
    nunjucks: `${srcFolder}/views/**/*.+(html|njk|nunjucks|nj)`,
    nunjucksData: [`${srcFolder}/views/components/**/*.json`, `${srcFolder}/views/data/db.json`],
    styles: [`${srcFolder}/styles/**/*.{scss,sass}`, `${srcFolder}/views/components/**/*.{scss,sass}`],
    scripts: `${srcFolder}/scripts/main/**/*.{cjs,js,mjs}`,
    images: `${srcFolder}/assets/img/**/*.{jpg,jpeg,png,gif,tiff,svg,webp}`,
  },
  clean: buildFolder,
  srcFolder: srcFolder,
  rootFolder: rootFolder,
};
