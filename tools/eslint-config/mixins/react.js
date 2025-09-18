module.exports = {
  plugins: ['react', 'react-refresh'],
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime',
  ],

  settings: {
    react: {
      version: 'detect',
    },
  },

  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/no-unknown-property': 'off',
    'react/prop-types': 'off',
  },
};
