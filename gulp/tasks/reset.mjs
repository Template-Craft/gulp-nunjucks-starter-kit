'use strict';

// eslint-disable-next-line n/no-unpublished-import
import { deleteAsync } from 'del';

/* global app */
export const reset = () => {
  return deleteAsync(app.path.clean);
};
