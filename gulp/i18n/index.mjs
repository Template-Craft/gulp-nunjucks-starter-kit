//  -----------------------------------------------------------------------------;
//    Переводы консольного вывода Build System.
//
//    Технические метки (badge) вроде [Cache], [DEBUG], PID/RAM/CPU, а также
//    названия сущностей Component/Section/Template НЕ переводятся - это
//    грепабельные технические ярлыки, а не проза, и так остаются во всех
//    локалях одинаковыми.
//
//    Сами словари лежат в ./locales/*.mjs (по одному файлу на язык), чтобы
//    этот файл не разрастался. Добавление нового языка = новый файл в
//    locales/ + одна строка импорта ниже, без правок кода, который
//    вызывает t(). Перевод может быть частичным - отсутствующий ключ
//    прозрачно падает обратно на DEFAULT_LOCALE.
//  -----------------------------------------------------------------------------;

'use strict';

import { settings } from '../config/settings.mjs';

import en from './locales/en.mjs';
import ru from './locales/ru.mjs';
import pl from './locales/pl.mjs';

// Язык и ключ фоллбэка, если settings.locale не поддерживается или в нём нет строки
const DEFAULT_LOCALE = 'en';

const messages = { en, ru, pl };

function resolveLocale(locale) {
  return messages[locale] ? locale : DEFAULT_LOCALE;
}

/**
 * Возвращает переведённую строку по ключу с подстановкой {{name}} из vars.
 * Порядок поиска: settings.locale -> DEFAULT_LOCALE -> сам ключ (чтобы не падать).
 *
 * @param {string} key - ключ сообщения, например 'cache.reset'
 * @param {Object} [vars] - подставляемые значения, например { reason: '...' }
 */
export function t(key, vars = {}) {
  const locale = resolveLocale(settings.locale);
  const template = messages[locale]?.[key] ?? messages[DEFAULT_LOCALE]?.[key] ?? key;

  return template.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, name) => (name in vars ? String(vars[name]) : match));
}
