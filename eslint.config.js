import js from '@eslint/js';
import astro from 'eslint-plugin-astro';
import tseslint from 'typescript-eslint';

export default [
  { ignores: ['.astro/**', 'dist/**', 'node_modules/**', 'src/env.d.ts'] },
  js.configs.recommended,
  { files: ['**/*.config.{js,mjs,ts}'], languageOptions: { globals: { process: 'readonly' } } },
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
];
