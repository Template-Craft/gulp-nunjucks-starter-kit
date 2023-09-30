/* eslint-disable n/no-unpublished-import */
/* eslint-disable import/order */
/* eslint-disable no-undef */
/* eslint-disable prefer-const */
'use strict';

import nunjucksRender from 'gulp-nunjucks-render';

// nodejs standart function
import fs from 'fs';

// Опции рендера для nunjucks:
const renderOptions = {
  path: './src/views/',
  watch: true,
  noCache: true,
  manageEnv: function (env) {
    let globalDataObj = JSON.parse(fs.readFileSync(app.path.src.globalData));
    env.addGlobal('getGlobalData', globalDataObj);
    env.addGlobal('getComponentData', (file) => `components/${file}/${file}.json`);
    env.addGlobal('getComponent', (file) => `components/${file}/${file}.njk`);
    env.addFilter('jsonParse', (value) => JSON.parse(value));
  },
};

export const templates = () => {
  return (
    app.gulp
      .src(app.path.src.nunjucks)
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: 'Nunjacks template',
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
    .src([app.path.src.nunjucksData, app.path.src.globalData])
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
