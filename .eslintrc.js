require("@rushstack/eslint-patch/modern-module-resolution")

module.exports = {
  root: true,
  /* 指定如何解析语法。*/
  /* 优先级低于parse的语法解析配置 */
  parserOptions: {
    parser: "@typescript-eslint/parser",
  },
  // https://eslint.bootcss.com/docs/user-guide/configuring#specifying-globals
  globals: {
    Nullable: true,
  },
  env: {
    "vue/setup-compiler-macros": true,
    node: true,
  },
  extends: [
    "./.eslintrc-auto-import.json", // 使用 TypeScript 时，unplugin-auto-import建议直接禁用 no-undef规则，因为 TypeScript 已经检查了它们，您无需担心这一点。
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript/recommended",
    "@vue/eslint-config-prettier",
  ],
  rules: {
    // "no-undef": "off",
    // 禁止使用 var
    "no-var": "error",
    semi: "off",
    // 优先使用 interface 而不是 type
    "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "vue/multi-word-component-names": "off",
    "vue/html-indent": [
      "error",
      2,
      {
        attribute: 1,
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: true,
        ignores: [],
      },
    ],
    // 关闭此规则 使用 prettier 的格式化规则， 感觉prettier 更加合理，
    // 而且一起使用会有冲突
    "vue/max-attributes-per-line": ["off"],
    // 强制使用驼峰命名
    "vue/component-name-in-template-casing": [
      "error",
      "PascalCase",
      {
        registeredComponentsOnly: true,
        ignores: [],
      },
    ],
    "@typescript-eslint/no-var-requires": 0,
  },
}
