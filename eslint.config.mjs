import js from '@eslint/js';
import globals from 'globals';

export default [
    {
        files: ['**/*.js'],
        ignores: ['**/node_modules/**', '**/dist/**'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.browser,
            }
        },
        rules: {
            ...js.configs.recommended.rules,
            'indent': ['error', 4],
            'quotes': ['error', 'single'],
            'semi': ['error', 'always'],
            'no-unused-vars': 'warn',
            'no-console': 'warn'
        }
    }
];