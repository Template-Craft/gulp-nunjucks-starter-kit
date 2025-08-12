'use strict';

// Убирает комментарии, чтобы не ловаить закомментированные вызовы
export function stripComments(content) {
  return content
    .replace(/{#([\s\S]*?)#}/g, '') // nunjucks comments
    .replace(/{%\s*comment\s*%}[\s\S]*?{%\s*endcomment\s*%}/g, '') // nunjucks block comment
    .replace(/<!--([\s\S]*?)-->/g, ''); // html comments
}
