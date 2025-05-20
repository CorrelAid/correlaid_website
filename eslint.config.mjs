import {defineConfig} from 'eslint/config';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import js from '@eslint/js';
import {FlatCompat} from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  {
    extends: compat.extends('google', 'prettier'),

    plugins: {
      svelte,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
      },

      ecmaVersion: 'latest',
      sourceType: 'module',
    },

    rules: {
      indent: [
        'error',
        2,
        {
          SwitchCase: 1,

          CallExpression: {
            arguments: 1,
          },
        },
      ],

      'valid-jsdoc': 'off',
      'require-jsdoc': 'off',
      camelcase: 'error',

      'no-console': [
        'error',
        {
          allow: ['warn', 'group', 'groupEnd', 'error', 'groupCollapsed'],
        },
      ],
    },
  },
]);
