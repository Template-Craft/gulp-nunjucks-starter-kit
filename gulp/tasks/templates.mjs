//  ----------------------------------------------------------------------------------------------------------------;
//    Таск-раннер для отслеживания nunjucks шаблонов
//  *
//  * -> env.addGlobal('getGlobalData', globalDataObj);
//  * делаем файлы с json данными доступными для всего окружения,
//  * c помощью manageEnv <- функция из nunjucks
//  * для предотвращения кэширования json используем fs -> стандартная функция node.js
//  * вызывать в нужном файле: {{ getGlobalData.your_arr_value }}
//  *
//  * -> env.addGlobal('getComponentData', (file) => `components/${file}/${file}.json`);
//  * * * * -> позволяет забыть о написании пути до файла с данными компонента, теперь достаточно вызвать фун-ию
//  * * * * -> и передать ей название компонента: {% include getComponentData("componentName") %}
//  * -> env.addGlobal('getComponent', (file) => `components/${file}/${file}.njk`);
//  * * * * -> позволяет забыть о написании пути до файла, теперь достаточно вызвать фун-ию
//  * * * * -> и передать ей название компонента: {% include getComponent("componentName") %}
//  * -> env.addFilter('jsonParse', (value) => JSON.parse(value));
//  * * * * -> фильтр, позволяющий распарсить данные из json объекта
//  * - подробные инструкции по использованию тех или иных возможностей шаблонизатора,
//  * - + на страницах документации
//  *
//  ----------------------------------------------------------------------------------------------------------------;
/* eslint-disable n/no-unpublished-import */
/* eslint-disable import/order */
/* eslint-disable no-undef */
/* eslint-disable prefer-const */

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
