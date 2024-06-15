/* eslint-disable no-undef */
//  -------------------------------------------------------------;
//    Таск-раннер для копирования картинок в папку build
//  -------------------------------------------------------------;

'use strict';

export const images = () => {
  return app.gulp
    .src(app.path.src.images, {
      // -> Данные параметры устраняют поломку картинок в gulp версии 5
      // страница с описанием ошибки: https://github.com/gulpjs/gulp/issues/2803
      encoding: false,
      buffer: true,
      removeBOM: false,
    })
    .pipe(app.gulp.dest(app.path.build.images))
    .pipe(app.plugins.browsersync.stream());
};
