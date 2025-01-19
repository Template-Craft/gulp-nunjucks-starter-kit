/* eslint-disable no-undef */
//  ----------------------------------------------------------------------------------------;
//    Таск-раннер для подключения, js и css сторонних плагинов, необходимых для для проекта.
//  ---------------------------------------------------------------------------------------;

'use strict';

// Собираем, и перемещаем в нужную дир-рию пподключённые плагины
export const vendors = async () => {
  const modules = app.path.nodeModules;
  const destination = app.path.build.plugins;

  // Указываем в массиве модули которые хотим подключить в проект, использование:
  // В массиве указываем путь до модуля (node_modules) и путь до дир-рии в которую Gulp.js их положит:
  // ['pathToNodeModules/pluginName/pluginSources/**', 'pathToProdDir/pluginName/'],
  const pluginsCollection = await new Map([[`${modules}/normalize.css/normalize.css`, `${destination}/normalize/`]]);

  await pluginsCollection.forEach((value, key) => {
    let src = key;
    let build = value;

    return app.gulp
      .src(src, { encoding: false })
      .pipe(
        app.plugins.plumber({
          errorHandler: function (error) {
            app.errors.handler(error, app.errors.messages.vendors);

            console.log(error.toString());
          },
        }),
      )
      .pipe(app.plugins.plumber.stop())
      .pipe(app.gulp.dest(build));
  });
};
