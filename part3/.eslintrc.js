module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2020: true,
  },
  extends: ["airbnb"],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    "linebreak-style": ["error", "windows"],
    quotes: ["error", "double"],
    "no-console": 0,
  },
};
