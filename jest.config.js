const { defaults } = require('jest-config')

module.exports = {
  "preset": "jest-expo",
  "setupTestFrameworkScriptFile": "<rootDir>/setup-tests.config.js",
  "transformIgnorePatterns": [
    "node_modules/(?!react-native|react-navigation)/"
  ],
  "coveragePathIgnorePatterns": [
    ...defaults.coveragePathIgnorePatterns,
    ".config.js"
  ]
}
