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
    .pipe(
      app.plugins.plumber({
        errorHandler: function (error) {
          app.errors.handler(error, app.errors.messages.assets);

          console.log(error.toString());
        },
      }),
    )
    .pipe(app.plugins.plumber.stop())
    .pipe(app.gulp.dest(app.path.build.fonts));
};
