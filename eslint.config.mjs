/* eslint-disable n/no-unpublished-import */

import globals from 'globals';
import babelParser from '@babel/eslint-parser';
import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import n from 'eslint-plugin-n';
import promise from 'eslint-plugin-promise';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  // 1. Игнорируемые файлы (добавлен билд)
  {
    ignores: ['**/node_modules/**', 'dist/**', 'build/**', 'package-lock.json'],
  },

  // 2. Базовые рекомендуемые правила и плагины
  ...fixupConfigRules(
    compat.extends(
      'eslint:recommended',
      'plugin:n/recommended',
      'plugin:promise/recommended'
    ),
  ).map((config) => ({
    ...config,
    files: ['**/*.{js,mjs}'],
  })),

  // 3. Главный блок настроек для JS файлов
  {
    files: ['**/*.{js,mjs}'],

    plugins: {
      n: fixupPluginRules(n),
      promise: fixupPluginRules(promise),
    },

    languageOptions: {
      parser: babelParser, // Парсер должен быть здесь
      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          browserslistEnv: 'javascripts',
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        app: 'readonly' // Регистрируем глобальную переменную Gulp
      },
    },

    linterOptions: {
      reportUnusedDisableDirectives: 'warn', // Заменено на 'warn' для удобства разработки
    },

    rules: {
      'no-unused-vars': 'warn',
      'object-shorthand': ['error', 'consistent'],

      // Полезные правила для Node.js 22 + ESM
      'n/no-missing-import': 'off',
      'no-redeclare': ['error', { "builtinGlobals": false }]
    },
  },

  // 4. Prettier ВСЕГДА должен идти самым последним объектом
  ...compat.extends('prettier'),
];
