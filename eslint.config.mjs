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
  {
    ignores: ['**/node_modules', 'node_modules/.*'],
  },
  ...compat.extends('prettier'),
  {
    languageOptions: {
      parser: babelParser,
      globals: { ...globals.browser, ...globals.node },
    },
  },
  ...fixupConfigRules(
    compat.extends('eslint:recommended', 'plugin:n/recommended', 'plugin:promise/recommended', 'prettier'),
  ).map((config) => ({
    ...config,
    files: ['**/*.{js,mjs}'],
  })),
  {
    files: ['**/*.{js,mjs}'],

    plugins: {
      n: fixupPluginRules(n),
      promise: fixupPluginRules(promise),
    },

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: {
        requireConfigFile: false,
      },
    },

    linterOptions: {
      reportUnusedDisableDirectives: true,
    },

    rules: {
      'no-unused-vars': 'warn',
      'object-shorthand': ['error', 'consistent'],
    },
  },
];
