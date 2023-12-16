/* eslint-disable n/no-unpublished-import */
/* eslint-disable import/order */
/* eslint-disable no-undef */
/* eslint-disable prefer-const */

//  ----------------------------------------------------------------------------------------------------------------;
//    Таск-раннер для отслеживания nunjucks шаблонов
//  *
//  *
//  *
//  ----------------------------------------------------------------------------------------------------------------;

'use strict';

import nunjucksRender from 'gulp-nunjucks-render';

// nodejs standart function
import fs from 'fs';

export const templates = () => {
  // Опции рендера для nunjucks:
  const renderOptions = {
    path: app.path.src.nunjucksRenderSrcFolder,
    watch: true,
    noCache: true,
    manageEnv: function (env) {
      env.addGlobal('getData', (name) => {
        const dataPath = `./src/views/data/${name}.json`;
        let result = JSON.parse(fs.readFileSync(dataPath));
        return result;
      });
      env.addGlobal('getSection', (pageName = false, name) => {
        if (pageName !== null && typeof pageName !== 'undefined') {
          return `sections/${pageName}/_${name}.njk`;
        } else {
          return `sections/_${name}.njk`;
        }
      });
      env.addGlobal('getComponent', (file) => `components/${file}/${file}.njk`);
      env.addFilter('jsonParse', (value) => JSON.parse(value));
    },
  };

  return (
    app.gulp
      .src(app.path.src.nunjucks)
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: 'Nunjucks template',
            sound: false,
            message: 'Error: <%= error.message %>',
          }),
        ),
      )
      // Nunjucks
      .pipe(nunjucksRender(renderOptions))
      .pipe(
        app.plugins.beautify.html({
          indent_size: 2,
          preserve_newlines: false,
        }),
      )
      .pipe(app.plugins.gulpIf(app.isBuild, app.plugins.replace('.css', '.min.css')))
      .pipe(app.plugins.gulpIf(app.isBuild, app.plugins.replace('.js', '.min.js')))
      .pipe(app.plugins.plumber.stop())
      .pipe(app.gulp.dest(app.path.build.html))
      .pipe(app.plugins.browsersync.stream())
  );
};

export const templatesData = () => {
  return app.gulp
    .src(app.path.src.nunjucksData)
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: 'Nunjacks data',
          sound: false,
          message: 'Error: <%= error.message %>',
        }),
      ),
    )
    .pipe(app.plugins.plumber.stop())
    .pipe(app.plugins.browsersync.stream());
};
