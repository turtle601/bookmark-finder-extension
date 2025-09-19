module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    require.resolve('bookmark-finder-extension-eslint-config/patch'),     
    require.resolve('bookmark-finder-extension-eslint-config'),
    require.resolve('bookmark-finder-extension-eslint-config/mixins/react'),
    'plugin:storybook/recommended',
    'plugin:storybook/recommended',
  ],
  settings: {
    react: {
      version: '18.3.1',
    },
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@rushstack/no-new-null': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
  },
  // Rush Stack은 @typescript-eslint 플러그인을 내장하고 있으므로
  // 타입스크립트 파서에 대한 설정이 필요합니다.
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
};
