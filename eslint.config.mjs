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
  // 1. Ignore files and derictories
  {
    ignores: ['**/node_modules/**', 'dist/**', 'build/**', 'package-lock.json'],
  },

  // 2. Base recommended rules
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

  // 3. General settings from js
  {
    files: ['**/*.{js,mjs}'],

    plugins: {
      n: fixupPluginRules(n),
      promise: fixupPluginRules(promise),
    },

    languageOptions: {
      parser: babelParser, // Parser
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
        app: 'readonly' // registration global variable 'app'
      },
    },

    linterOptions: {
      reportUnusedDisableDirectives: 'warn',
    },

    rules: {
      'no-unused-vars': 'warn',
      'object-shorthand': ['error', 'consistent'],

      // Rules from Node.js 22 + ESM
      'n/no-missing-import': 'off',
      'no-redeclare': ['error', { "builtinGlobals": false }]
    },
  },

  // 4. Prettier
  ...compat.extends('prettier'),
];
