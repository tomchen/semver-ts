// @ts-check

import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import compat from 'eslint-plugin-compat'

const conf = tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  compat.configs['flat/recommended'],
  {
    ignores: [
      '.github/',
      '.vscode/',
      'dist/',
      'docs/',
      'node_modules/',
      '**/*.d.ts',
    ],
  },
  {
    languageOptions: {
      ecmaVersion: 6,
    },
  },
)

export default conf
