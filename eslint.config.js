const eslintJs = require('@eslint/js');


module.exports = [
  eslintJs.configs.recommended,
  {
    
    languageOptions: {
      globals: {
        document: 'readonly',
        window: 'readonly',
        localStorage: 'readonly',
        fetch: 'readonly',
        URLSearchParams:'readonly',
        alert:'readonly',
        setTimeout: 'readonly',
        console: 'readonly',
        setTimeout: 'readonly'
      }
    },
    // files: ['*/.js', '*/.cjs', '*/.mjs'], // = default, not needed
   
    rules: { 'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }] },
  },
];