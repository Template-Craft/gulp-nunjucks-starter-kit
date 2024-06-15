//  -------------------------------------------------------------------------;
//    В данном файле мы храним коллекцию путей в объекте path
//    в нужном месте указываем пути: app.path.pathName
//    где app - это у нас глобальная переменная, объявленная в gulpfile.mjs
//  -------------------------------------------------------------------------;

'use strict';

import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve()); // -> получаем корневую дир-ию

const buildFolder = './build';
const srcFolder = './src';
const nodeModules = './node_modules';

// объект с путями к файлам и папкам:
export const path = {
  build: {
    html: `${buildFolder}/`,
    styles: `${buildFolder}/styles/`,
    scripts: `${buildFolder}/scripts/`,
    images: `${buildFolder}/assets/img/`,
    fonts: `${buildFolder}/assets/fonts/`,
    plugins: `${buildFolder}/plugins/`,
  },
  src: {
    nunjucks: `${srcFolder}/views/pages/*.+(html|njk|nunjucks|nj)`,
    nunjucksRenderSrcFolder: `${srcFolder}/views/`,
    nunjucksData: `${srcFolder}/views/data/**/*.json`,
    styles: `${srcFolder}/styles/main.scss`,
    scripts: `${srcFolder}/scripts/main/app.{cjs,js,mjs}`,
    images: `${srcFolder}/assets/img/**/*.{jpg,jpeg,png,gif,tiff,svg,webp}`,
    fonts: `${srcFolder}/assets/fonts/**/*.{woff,woff2,ttf}`,
  },
  watch: {
    nunjucks: `${srcFolder}/views/**/*.+(html|njk|nunjucks|nj)`,
    nunjucksData: `${srcFolder}/views/data/**/*.json`,
    styles: [`${srcFolder}/styles/**/*.{scss,sass}`, `${srcFolder}/views/components/**/*.{scss,sass}`],
    scripts: [`${srcFolder}/scripts/main/**/*.{cjs,js,mjs}`, `${srcFolder}/views/components/**/*.{cjs,js,mjs}`],
    images: `${srcFolder}/assets/img/**/*.{jpg,jpeg,png,gif,tiff,svg,webp}`,
  },
  clean: buildFolder,
  srcFolder: srcFolder,
  rootFolder: rootFolder,
  nodeModules: nodeModules,
};
