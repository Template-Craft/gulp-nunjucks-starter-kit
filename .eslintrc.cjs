module.exports = {
  root: true,
  extends: ['standard', 'prettier'],
  ignorePatterns: ['node_modules', 'node_modules/.*'],
  overrides: [
    {
      extends: [
        'eslint:recommended',
        'plugin:import/recommended',
        'plugin:jsdoc/recommended-typescript-flavor',
        'plugin:n/recommended',
        'plugin:promise/recommended',
        'prettier',
      ],
      files: ['**/*.{cjs,js,mjs}'],
      parserOptions: {
        ecmaVersion: 'latest',
      },
      plugins: ['import', 'n', 'promise'],
      rules: {
        // Check import or require statements are A-Z ordered
        'import/order': [
          'error',
          {
            alphabetize: { order: 'asc' },
            'newlines-between': 'always',
          },
        ],
      },
    },
    {
      // Extensions required for ESM import
      files: ['**/*.mjs'],
      rules: {
        'import/extensions': [
          'error',
          'always',
          {
            ignorePackages: true,
            pattern: {
              cjs: 'always',
              js: 'always',
              mjs: 'always',
            },
          },
        ],
      },
    },
  ],
  parser: '@babel/eslint-parser',
}
