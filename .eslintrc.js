module.exports = {
  "env": {
    "jest": true,
    "browser": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "parser": "babel-eslint",
  "rules": {
    "no-console": "off",
    "indent": [
      "error", 2, { "SwitchCase": 1 }
    ],
    "globals": {
      "fetch": false
    },
    "no-use-before-define": "off",
    "react/jsx-filename-extension": "off",
    "react/prop-types": "off",
    "react/display-name": [
      "enabled", { "ignoreTranspilerName": true }
    ],
    "comma-dangle": "off",
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error", "single", { "avoidEscape": true }
    ],
    "semi": [
      "error",
      "never"
    ],
    "eqeqeq": "error",
    "no-trailing-spaces": "error",
    "object-curly-spacing": [
      "error",
      "always"
    ],
    "arrow-spacing": [
      "error", { "before": true, "after": true }
    ],
    "no-multi-spaces": "error",
    "no-magic-numbers": [
      "error", { "ignore": [0, 1, 60, 1000] }
    ],
    "comma-spacing": [
      "error", { "before": false, "after": true }
    ],
    "no-multiple-empty-lines": [
      "error", { "max": 1 }
    ],
    "padding-line-between-statements": [
      "error",
      { blankLine: "always", prev: "*", next: "return" },
      { blankLine: "always", prev: ["const", "let", "var"], next: "*"},
      { blankLine: "any", prev: ["const", "let", "var"], next: ["const", "let", "var"]}
    ],
    "operator-linebreak": [
      "error",
      "before"
    ],
    "max-len": [
      "error", { "code": 120 }
    ],
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}