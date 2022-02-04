module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  plugins: ["prettier", "@typescript-eslint"],
  extends: ["plugin:prettier/recommended", "next"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
  },
};
