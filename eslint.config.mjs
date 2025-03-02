import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      // React
      'jsx-quotes': ['error', 'prefer-single'],
      'quotes': ['error', 'single'],
      'prefer-const': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/self-closing-comp': ['error', { component: true, html: true }],
      'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],

      // TS
      '@typescript-eslint/no-empty-object-type': 'off',
    }
  },
];

export default eslintConfig;
