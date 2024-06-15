/* eslint-disable no-undef */
//  ----------------------------------------------------------------------------------------;
//    Таск-раннер для подключения, js и css сторонних плагинов, необходимых для для проекта.
//  ---------------------------------------------------------------------------------------;

'use strict';

// Собираем, и перемещаем в нужную дир-рию пподключённые плагины
export const vendors = async () => {
  const modules = app.path.nodeModules;
  const destination = app.path.build.plugins;

  function _getPluginName(name) {
    return `${modules}/${name}/**/*.*`;
  }

  function _moveToPluginName(name) {
    return `${destination}/${name}/`;
  }

  const pluginsCollection = await new Map([
    [`${_getPluginName('normalize.css')}`, `${_moveToPluginName('normalize.css')}`],
  ]);

  await pluginsCollection.forEach((value, key) => {
    let src = key;
    let build = value;

    return app.gulp.src(src).pipe(app.gulp.dest(build));
  });
};
