module.exports = {
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "parser": "babel-eslint",
  "env": {
    "jest": true,
  },
  "rules": {
    "no-use-before-define": "off",
    "react/jsx-filename-extension": "off",
    "react/prop-types": "off",
    "comma-dangle": "off",
    "react/jsx-uses-vars": 2
  },
  "globals": {
    "fetch": false
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}