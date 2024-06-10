/* eslint-disable no-undef */

//  -------------------------------------------------------------;
//    Таск-раннер для отслеживания шрифтов в проекте,
//    и их переносе в папку build
//  -------------------------------------------------------------;

'use strict';

export const fonts = () => {
  return app.gulp
    .src(app.path.src.fonts, {
      encoding: false,
    })
    .pipe(app.gulp.dest(app.path.build.fonts));
};
