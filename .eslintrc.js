var config = {
  extends: "eslint:recommended",
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    semi: 2
  }
};
module.exports = config;
