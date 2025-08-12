//  -------------------------------------------------------------------------;
//    В данном файле мы храним коллекцию путей в объекте path
//    в нужном месте указываем пути: app.path.pathName
//    где app - это у нас глобальная переменная, объявленная в gulpfile.mjs
//  -------------------------------------------------------------------------;

'use strict';

import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve()); // -> получаем корневую дир-ию

const projectRoot = nodePath.resolve('src');

const buildFolder = 'build';
const srcFolder = 'src';
const nodeModules = 'node_modules';

// объект с путями к файлам и папкам:
export const path = {
  projectRoot: projectRoot,
  usageMap: `${projectRoot}/views`,
  initial: {
    styles: 'main.scss',
  },
  build: {
    html: `${buildFolder}/`,
    styles: `${buildFolder}/assets/styles/`,
    scripts: `${buildFolder}/scripts/`,
    images: `${buildFolder}/assets/img/`,
    fonts: `${buildFolder}/assets/fonts/`,
    vendor: `${buildFolder}/vendor/`,
  },
  src: {
    nunjucksIndexDir: `${srcFolder}/views/`,
    nunjucksPages: `${srcFolder}/views/pages/**/*.njk`,
    nunjucksData: `${srcFolder}/views/data/**/*.json`,
    styles: `${srcFolder}/assets/styles/main.scss`,
    scripts: `${srcFolder}/scripts/main/app.mjs`,
    images: `${srcFolder}/assets/img/**/*.{jpg,jpeg,png,gif,tiff,svg,webp}`,
    fonts: `${srcFolder}/assets/fonts/**/*.{woff,woff2,ttf}`,
  },
  watch: {
    nunjucks: `${srcFolder}/views/**/*.njk`,
    nunjucksData: `${srcFolder}/views/data/**/*.json`,
    styles: [
      `${srcFolder}/assets/styles/*.scss`,
      `${srcFolder}/assets/styles/main/**/*.scss`,
      `${srcFolder}/assets/styles/defaults/**/*.scss`,
      `${srcFolder}/views/components/**/*.scss`,
    ],
    scripts: [`${srcFolder}/scripts/main/**/*.{js,mjs}`, `${srcFolder}/views/components/**/*.{js,mjs}`],
    images: `${srcFolder}/assets/img/**/*.{jpg,jpeg,png,gif,tiff,svg,webp}`,
  },
  clean: buildFolder,
  srcFolder: srcFolder,
  rootFolder: rootFolder,
  nodeModules: nodeModules,
};
