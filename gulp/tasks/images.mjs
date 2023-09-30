/* eslint-disable n/no-unpublished-import */
/* eslint-disable import/order */
/* eslint-disable no-undef */
'use strict';

export const images = () => {
  return app.gulp
    .src(app.path.src.images)
    .pipe(app.gulp.dest(app.path.build.images))
    .pipe(app.plugins.browsersync.stream());
};
