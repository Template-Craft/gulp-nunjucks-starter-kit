//  ----------------------------------------------------------------------------------------;
//    Таск-раннер для выполнения после build
//  ---------------------------------------------------------------------------------------;

'use strict';

// eslint-disable-next-line n/no-unpublished-import
import { deleteAsync } from 'del';

/* global app */
export const postbuild = async () => {
  const trashColection = [
    `${app.path.build.plugins}/**/*.{json,yaml,md,markdown,sass,scss,less,rb,html}`,
    `${app.path.build.plugins}/**/**/*.{json,yaml,md,markdown,sass,scss,less,rb,html,!.min.js,!.min.css}`,
  ];

  return await deleteAsync(trashColection);
};
